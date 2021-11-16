import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# os.environ['PATH'] += r"C:\Users\malus\OneDrive\Desktop\Mp2\edgedriver_win64"
# driver = webdriver.Edge()
keyword = "Kurti set"

class automate(webdriver.Edge):
    def __init__(self, driver_path=r"C:\Users\malus\OneDrive\Desktop\Mp2\edgedriver_win64",
                 teardown=False):
        self.driver_path = driver_path
        self.teardown = teardown
        os.environ['PATH'] += self.driver_path
        #self.driver=webdriver.Edge()
        super().__init__()
        

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.teardown:
            self.quit()

    def land_first_page(self):
        self.get("https://www.amazon.in/")
        searchbar = self.find_element_by_id("twotabsearchtextbox")
        searchbar.send_keys(keyword+ Keys.ENTER)
        print(self.window_handles)

    def land_second_page(self):
        self.execute_script('''window.open("", "_blank");''')
        self.switch_to.window(self.window_handles[1])
        self.get("https://www.flipkart.com/")
        closeButton = self.find_element_by_css_selector(
            'button[class="_2KpZ6l _2doB4z"]'
        )
        if(closeButton):
            closeButton.click()

        searchbar = self.find_element_by_css_selector(
            'input[title="Search for products, brands and more"]'
        )
       
        searchbar.send_keys(keyword+ Keys.ENTER)