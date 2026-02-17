from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the app
    page.goto("http://localhost:4200")

    # Verify title
    title = page.locator("h2").text_content()
    print(f"Title: {title}")
    assert "jules-productivi" in title

    # Verify columns
    columns = page.locator("app-column")
    print(f"Number of columns: {columns.count()}")
    assert columns.count() >= 3

    # Add a new column
    page.get_by_role("button", name="Add Column").click()
    page.get_by_label("Title").fill("Test Column")
    page.get_by_label("Color").fill("#ff0000")
    page.get_by_role("button", name="Save").click()

    # Verify new column
    page.wait_for_timeout(500) # Wait for animation/update
    assert columns.count() >= 4

    # Add a ticket to "Test Column"
    # Find the "Test Column" and click "Add Ticket" button inside it
    # This is tricky without specific IDs, but I can find the column by text
    column = page.locator("app-column").filter(has_text="Test Column")
    column.get_by_role("button", name="Add Ticket").click()

    page.get_by_label("Title").fill("Test Ticket")
    page.get_by_label("Description").fill("This is a test ticket")
    page.get_by_role("combobox", name="Type").click() # Or just click the select
    page.get_by_role("option", name="Bug").click()
    page.get_by_label("Color").fill("#00ff00")
    page.get_by_role("button", name="Save").click()

    page.wait_for_timeout(500)

    # Verify ticket
    ticket = column.locator("app-ticket").filter(has_text="Test Ticket")
    assert ticket.count() == 1

    # Take screenshot
    page.screenshot(path="verification/board.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
