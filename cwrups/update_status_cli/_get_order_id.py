def prompt_for_order_id():
    """Get order ID either from keyboard or barcode scanner input."""
    input_value = input("Enter Order ID: ")

    if len(input_value) == 12:  # barcode scanner
        input_value = int(input_value[0:11])  # strip off verification number
        print(f"**Barcode Scanner Input Parsed as {input_value}**")
    else:  # keyboard
        input_value = int(input_value)

    print("")  # for aesthetic

    return input_value
