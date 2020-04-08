import requests

from ._constants import BASE_URL


def prompt_for_distribution_center():
    distribution_centers_response = requests.get(BASE_URL + "distribution-center/")
    print("Choose a distribution center...")
    for distribution_center_tuple in distribution_centers_response.json():
        if distribution_center_tuple["distribution_center_id"] > 1:  # i.e., not origin or destination point
            print(f"({distribution_center_tuple['distribution_center_id']}) {distribution_center_tuple['description']}")
    choice = int(input("Distribution Center: "))
    print("")  # empty line for aesthetic

    return choice
