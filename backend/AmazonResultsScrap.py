# pip install selenium & web_driver_manager before executing
#finallist returns search results
from selenium import  webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(ChromeDriverManager().install())

#driver.maximize_window()
driver.get("https://www.amazon.in/")
driver.implicitly_wait(10)
driver.find_element(By.XPATH,"//input[contains(@id,'search')]").send_keys("Mi Phone")
driver.find_element(By.XPATH,"//input[@value='Go']").click()
driver.find_element(By.XPATH,"//span[text()='MI']").click()

search_result = driver.find_elements(By.XPATH,"//span[contains(@class,'a-color-base a-text-normal')]")
product_price = driver.find_elements(By.XPATH,"//span[contains(@class,'price-whole')]")
product_link = driver.find_elements(By.XPATH,"//a[contains(@class,'a-link-normal a-text-normal')]")
product_img = driver.find_elements(By.XPATH,"//img[contains(@class,'s-image')]")

scrap_list = []
scrap_link = []
scrap_price = []
scrap_img = []

for lnk in scrap_img:
    print(lnk.get_attribute('src'))
    scrap_img.append(lnk.get_attribute('src'))


for lnk in product_link:
    print(lnk.get_attribute('href'))
    scrap_link.append(lnk.get_attribute('href'))

for res in search_result:
    print(res.text)
    scrap_list.append(res.text)

for res in product_price:
    print(res.text)
    scrap_price.append(res.text)

finallist = zip(scrap_list,scrap_link,scrap_price,scrap_img)


for data in list(finallist):
    print(data)


