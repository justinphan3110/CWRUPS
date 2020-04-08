import requests

from datetime import datetime

from ._constants import BASE_URL


def dump_tracking_log(order_id):
    enter_updates_response = requests.get(BASE_URL + "orders/enter_updates/" + str(order_id))
    enter_update_messages = []
    for enter_update_tuple in sorted(enter_updates_response.json(),
            key=lambda tuple: datetime.fromisoformat(tuple["distribution_center_enter_time"])):
        enter_update_messages.append(
            f"{enter_update_tuple['distribution_center_enter_time']}: Arrived at {enter_update_tuple['description']} "
            f"on a {enter_update_tuple['make']} {enter_update_tuple['model']}")

    exit_updates_response = requests.get(BASE_URL + "orders/exit_updates/" + str(order_id))
    exit_update_messages = []
    for exit_update_tuple in sorted(exit_updates_response.json(),
                                     key=lambda tuple: datetime.fromisoformat(tuple["distribution_center_exit_time"])):
        exit_update_messages.append(
            f"{exit_update_tuple['distribution_center_exit_time']}: Departed from {exit_update_tuple['description']} "
            f"on a {exit_update_tuple['make']} {exit_update_tuple['model']}")

    joined_messages = [None] * (len(enter_update_messages) + len(exit_update_messages))
    joined_messages[::2] = exit_update_messages
    joined_messages[1::2] = enter_update_messages

    if not joined_messages:
        joined_messages = ["Awaiting Pickup"]

    # TODO: Implement, inc'l from and to as well as the new queries
    print("Tracking Log (Oldest to Newest Updates):")
    for message in joined_messages:
        print(message)
