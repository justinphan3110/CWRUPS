import requests

from ._constants import BASE_URL


def prompt_for_transit_asset():
    hard_assets_response = requests.get(BASE_URL + "transit-assets/")
    print("Choose a hard asset to use for transit...")
    for asset_tuple in hard_assets_response.json():
        print(f"({asset_tuple['asset_id']}) {asset_tuple['make']} {asset_tuple['model']}")
    choice = int(input("Transit Hard Asset: "))
    print("")  # empty line for aesthetic

    return choice
