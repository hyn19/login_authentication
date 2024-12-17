class BookmarkSystem:
    def __init__(self):
        self.bookmarks = {}

    def add_bookmark(self, title, url):
        if title not in self.bookmarks:
            self.bookmarks[title] = url
            print(f"Bookmark '{title}' added successfully.")
        else:
            print(f"Bookmark with title '{title}' already exists.")

    def list_bookmarks(self):
        if self.bookmarks:
            print("List of Bookmarks:")
            for title, url in self.bookmarks.items():
                print(f"Title: {title}, URL: {url}")
        else:
            print("No bookmarks found.")

    def delete_bookmark(self, title):
        if title in self.bookmarks:
            del self.bookmarks[title]
            print(f"Bookmark '{title}' deleted successfully.")
        else:
            print(f"Bookmark with title '{title}' not found.")

# Example Usage
bookmark_system = BookmarkSystem()

# Adding bookmarks
bookmark_system.add_bookmark("Google", "https://www.google.com")
bookmark_system.add_bookmark("Reddit", "https://www.reddit.com")
bookmark_system.add_bookmark("GitHub", "https://www.github.com")
bookmark_system.add_bookmark("Google", "https://www.google.com")  # Trying to add duplicate bookmark

# Listing bookmarks
bookmark_system.list_bookmarks()

# Deleting bookmark
bookmark_system.delete_bookmark("Reddit")
bookmark_system.delete_bookmark("Stack Overflow")  # Trying to delete non-existent bookmark
