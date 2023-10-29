# Sample inventory data
inventory = {
    1: {"title": "Book 1", "author": "Author 1", "ISBN": "ISBN-001", "price": 10.99, "quantity": 10},
    2: {"title": "Book 2", "author": "Author 2", "ISBN": "ISBN-002", "price": 15.99, "quantity": 5},
    # Add more books here
}

# Shopping cart
cart = []

# Function to display available books
def display_inventory():
    print("Available Books:")
    for book_id, book_info in inventory.items():
        print(f"{book_id}: {book_info['title']} by {book_info['author']} - ${book_info['price']} (ISBN: {book_info['ISBN']}) [{book_info['quantity']} available]")

# Function to add a book to the cart
def add_to_cart(book_id):
    if book_id in inventory:
        if inventory[book_id]["quantity"] > 0:
            cart.append(inventory[book_id])
            inventory[book_id]["quantity"] -= 1
            print(f"{inventory[book_id]['title']} added to your cart.")
        else:
            print("Sorry, this book is out of stock.")
    else:
        print("Invalid book ID. Please enter a valid ID.")

# Function to view the cart
def view_cart():
    if not cart:
        print("Your cart is empty.")
    else:
        print("Your Cart:")
        for i, book in enumerate(cart, 1):
            print(f"{i}. {book['title']} - ${book['price']}")

# Function to remove a book from the cart
def remove_from_cart(book_index):
    if 0 <= book_index < len(cart):
        removed_book = cart.pop(book_index)
        print(f"{removed_book['title']} removed from your cart.")
    else:
        print("Invalid cart item index. Please enter a valid index.")

# Main program loop
while True:
    print("\nOptions:")
    print("1. View available books")
    print("2. Add a book to your cart")
    print("3. View your cart")
    print("4. Remove a book from your cart")
    print("5. Exit")

    choice = input("Enter the number of your choice: ")

    if choice == "1":
        display_inventory()
    elif choice == "2":
        book_id = int(input("Enter the ID of the book you want to add to your cart: "))
        add_to_cart(book_id)
    elif choice == "3":
        view_cart()
    elif choice == "4":
        book_index = int(input("Enter the index of the book you want to remove from your cart: "))
        remove_from_cart(book_index)
    elif choice == "5":
        print("Thank you for shopping with us. Goodbye!")
        break
    else:
        print("Invalid choice. Please select a valid option.")
