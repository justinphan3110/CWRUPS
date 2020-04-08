import sys
from datetime import datetime

import requests

from cwrups.update_status_cli._constants import BASE_URL
from cwrups.update_status_cli._dump_tracking_log import dump_tracking_log
from ._get_order_id import prompt_for_order_id
from ._get_distribution_center import prompt_for_distribution_center
from ._get_transit_asset import prompt_for_transit_asset

# FUTURE: Better validation to ensure that two transit assets aren't being used concurrently.


def main():
    while True:
        print("Choose an action...")
        print("(0) Quit")
        print("(1) Track order")
        print("(2) Pick up order at origin and deliver to distribution center")
        print("(3) Route order between distribution centers")
        print("(4) Deliver order to final destination")
        print("(5) Print all-time number of orders through each distribution center")
        print("(6) Get current effective shipping rates for each parcel type")

        choice = int(input("Action: "))
        print("")  # empty line for aesthetic

        if choice == 0:
            break

        if choice == 1:
            order = prompt_for_order_id()
            dump_tracking_log(order)

        if choice == 2:
            order_id = prompt_for_order_id()
            distribution_center = prompt_for_distribution_center()
            transit_asset = prompt_for_transit_asset()

            ship_from_response = requests.get(BASE_URL + "ship/from/address/" + str(order_id))
            leg_origin_address = ship_from_response.json()["address_id"]

            distribution_center_address_response = requests.get(
                BASE_URL + "distribution-center/address/" + str(distribution_center))
            leg_destination_address = distribution_center_address_response.json()["address_id"]

            leg_departure_time = datetime.now()
            print(f"Beginning shipping leg at {leg_departure_time} as departure time")
            create_leg_response = requests.post(BASE_URL + "ship/leg/", data={
                "departure_time": leg_departure_time,
                "arrival_time": None
            })
            new_leg_id = create_leg_response.json()["leg_id"]

            requests.post(BASE_URL + "ship/leg/origin/", data={
                "shipping_leg_id": new_leg_id,
                "address_id": leg_origin_address
            })

            requests.post(BASE_URL + "ship/leg/destination/", data={
                "shipping_leg_id": new_leg_id,
                "address_id": leg_destination_address
            })

            requests.post(BASE_URL + "ship/leg/asset/", data={
                "leg_id": new_leg_id,
                "asset_id": transit_asset
            })

            requests.post(BASE_URL + "status-updates/", data={
                "order_id": order_id,
                "distribution_center": 0,  # origin point
                "enter_leg": None,
                "exit_leg": new_leg_id
            })

            input("Press enter to simulate arrival at distribution center...")

            leg_arrival_time = datetime.now()
            print(f"Ending shipping leg at {leg_arrival_time} as arrival time")
            requests.post(BASE_URL + "ship/leg/update/" + str(new_leg_id), data={
                "arrival_time": leg_arrival_time
            })

            requests.post(BASE_URL + "status-updates/", data={
                "order_id": order_id,
                "distribution_center": distribution_center,
                "enter_leg": new_leg_id,
                "exit_leg": None,
            })

        if choice == 3:
            # FUTURE: Support multiple orders on a given leg between distribution centers.
            order_id = prompt_for_order_id()
            transit_asset = prompt_for_transit_asset()
            dest_distribution_center = prompt_for_distribution_center()

            current_update_response = requests.get(BASE_URL + "orders/current_status_update/" + str(order_id))
            current_status_update = current_update_response.json()["status_update_id"]

            current_distribution_center_response = requests.get(
                BASE_URL + "orders/current_distribution_center/" + str(order_id))
            src_distribution_center = current_distribution_center_response.json()["distribution_center"]

            src_distro_addr_resp = requests.get(
                BASE_URL + "distribution-center/address/" + str(src_distribution_center))
            leg_origin_address = src_distro_addr_resp.json()["address_id"]

            dest_distro_addr_resp = requests.get(
                BASE_URL + "distribution-center/address/" + str(dest_distribution_center))
            leg_destination_address = dest_distro_addr_resp.json()["address_id"]

            leg_departure_time = datetime.now()
            print(f"Beginning shipping leg at {leg_departure_time} as departure time")
            create_leg_response = requests.post(BASE_URL + "ship/leg/", data={
                "departure_time": leg_departure_time,
                "arrival_time": None
            })
            new_leg_id = create_leg_response.json()["leg_id"]

            requests.post(BASE_URL + "ship/leg/origin/", data={
                "shipping_leg_id": new_leg_id,
                "address_id": leg_origin_address
            })

            requests.post(BASE_URL + "ship/leg/destination/", data={
                "shipping_leg_id": new_leg_id,
                "address_id": leg_destination_address
            })

            requests.post(BASE_URL + "ship/leg/asset/", data={
                "leg_id": new_leg_id,
                "asset_id": transit_asset
            })

            requests.post(BASE_URL + "status-updates/update/" + str(current_status_update), data={
                "exit_leg": new_leg_id
            })

            input("Press enter to simulate arrival at destination point...")

            leg_arrival_time = datetime.now()
            print(f"Ending shipping leg at {leg_arrival_time} as arrival time")
            requests.post(BASE_URL + "ship/leg/update/" + str(new_leg_id), data={
                "arrival_time": leg_arrival_time
            })

            requests.post(BASE_URL + "status-updates/", data={
                "order_id": order_id,
                "distribution_center": dest_distribution_center,
                "enter_leg": new_leg_id,
                "exit_leg": None,
            })

        if choice == 4:
            order_id = prompt_for_order_id()
            transit_asset = prompt_for_transit_asset()

            current_update_response = requests.get(BASE_URL + "orders/current_status_update/" + str(order_id))
            current_status_update = current_update_response.json()["status_update_id"]

            ship_to_response = requests.get(BASE_URL + "ship/to/address/" + str(order_id))
            leg_destination_address = ship_to_response.json()["address_id"]

            current_distribution_center_response = requests.get(
                BASE_URL + "orders/current_distribution_center/" + str(order_id))
            distribution_center = current_distribution_center_response.json()["distribution_center"]

            ship_from_response = requests.get(
                BASE_URL + "distribution-center/address/" + str(distribution_center))
            leg_origin_address = ship_from_response.json()["address_id"]

            leg_departure_time = datetime.now()
            print(f"Beginning shipping leg at {leg_departure_time} as departure time")
            create_leg_response = requests.post(BASE_URL + "ship/leg/", data={
                "departure_time": leg_departure_time,
                "arrival_time": None
            })
            new_leg_id = create_leg_response.json()["leg_id"]

            requests.post(BASE_URL + "ship/leg/origin/", data={
                "shipping_leg_id": new_leg_id,
                "address_id": leg_origin_address
            })

            requests.post(BASE_URL + "ship/leg/destination/", data={
                "shipping_leg_id": new_leg_id,
                "address_id": leg_destination_address
            })

            requests.post(BASE_URL + "ship/leg/asset/", data={
                "leg_id": new_leg_id,
                "asset_id": transit_asset
            })

            requests.post(BASE_URL + "status-updates/update/" + str(current_status_update), data={
                "exit_leg": new_leg_id
            })

            input("Press enter to simulate arrival at destination point...")

            leg_arrival_time = datetime.now()
            print(f"Ending shipping leg at {leg_arrival_time} as arrival time")
            requests.post(BASE_URL + "ship/leg/update/" + str(new_leg_id), data={
                "arrival_time": leg_arrival_time
            })

            requests.post(BASE_URL + "status-updates/", data={
                "order_id": order_id,
                "distribution_center": 1,  # destination point
                "enter_leg": new_leg_id,
                "exit_leg": None,
            })

        if choice == 5:
            distribution_center_count_response = requests.get(BASE_URL + "distribution-center/count")
            print("{:2}  {:20}  {:5}".format("ID", "Description", "Count"))
            for distribution_center_count_tuple in distribution_center_count_response.json():
                print("{:2}  {:20}  {:5}".format(
                    distribution_center_count_tuple["distribution_center_id"],
                    distribution_center_count_tuple["description"],
                    distribution_center_count_tuple["orders_handled"])
                )

        if choice == 6:
            effective_rate_response = requests.get(BASE_URL + "shipping-rates/current-effective/")
            print("{:2}  {:18}  {:8}   {:25}".format("ID", "Description", "Flat Fee", "Effective Since Date"))
            for distribution_center_count_tuple in effective_rate_response.json():
                print("{:2}  {:18}  {:8}   {:25}".format(
                    distribution_center_count_tuple["type_id"],
                    distribution_center_count_tuple["type_description"],
                    distribution_center_count_tuple["flat_fee"],
                    distribution_center_count_tuple["effective_date"])
                )

        # Print dividers between action cycles.
        print("")
        print("**************************************************")
        print("")


if __name__ == "__main__":
    sys.exit(main())
