from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Go to the app
    page.goto("http://localhost:4200")

    # Add a new column
    page.get_by_role("button", name="Add Column").click()
    page.get_by_label("Title").fill("Map Column")
    page.get_by_role("button", name="Save").click()
    page.wait_for_timeout(500)

    # Add a Map ticket
    column = page.locator("app-column").filter(has_text="Map Column")
    column.get_by_role("button", name="Add Ticket").click()

    page.get_by_label("Title").fill("My Location")
    page.get_by_role("combobox", name="Type").click()
    page.get_by_role("option", name="Map").click()

    # Wait for map to appear in dialog
    page.wait_for_selector("#map")

    # Click on the map to add a pin (approximate center)
    map_box = page.locator("#map").bounding_box()
    if map_box:
        page.mouse.click(map_box["x"] + map_box["width"] / 2, map_box["y"] + map_box["height"] / 2)

    page.get_by_role("button", name="Save").click()

    page.wait_for_timeout(1000)

    # Verify ticket exists and has map thumbnail
    ticket = column.locator("app-ticket").filter(has_text="My Location")
    assert ticket.count() == 1

    # Check for map thumbnail
    # Since ID is dynamic (map-{{id}}), we look for class map-thumbnail
    assert ticket.locator(".map-thumbnail").count() == 1

    # Take screenshot
    page.screenshot(path="verification/map_ticket.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
