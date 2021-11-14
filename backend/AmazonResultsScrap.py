# pip install selenium & web_driver_manager before executing
#finallist returns search results
import json
from selenium import  webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager

search_value = "shirts"
option = webdriver.ChromeOptions()
option.add_argument('headless')
driver = webdriver.Chrome(ChromeDriverManager().install(),options=option)

driver.get("https://www.amazon.in/s?k=" + search_value)
#driver.implicitly_wait(10)
#driver.find_element(By.XPATH,"//input[contains(@id,'search')]").send_keys(search_value)
#driver.find_element(By.XPATH,"//input[@value='Go']").click()
#driver.find_element(By.XPATH,"//span[text()='MI']").click()

flg = 0

try:
    test = driver.find_element(By.XPATH,"//span[contains(@class,'a-size-medium a-color-base a-text-normal')]")
except NoSuchElementException:
    flg = 1

if flg==0:
    search_result = driver.find_elements(By.XPATH,"//span[contains(@class,'a-size-medium a-color-base a-text-normal')]")
    product_price = driver.find_elements(By.XPATH,"//span[contains(@class,'price-whole')]")
    product_link = driver.find_elements(By.XPATH,"//a[contains(@class,'a-link-normal s-no-outline')]")
    product_img = driver.find_elements(By.XPATH,"//img[contains(@class,'s-image')]")
else:
    search_result = driver.find_elements(By.XPATH,"//span[contains(@class,'a-size-base-plus a-color-base a-text-normal')]")
    product_price = driver.find_elements(By.XPATH, "//span[contains(@class,'price-whole')]")
    product_link = driver.find_elements(By.XPATH, "//a[contains(@class,'a-link-normal s-no-outline')]")
    product_img = driver.find_elements(By.XPATH, "//img[contains(@class,'s-image')]")


scrap_list = []
scrap_link = []
scrap_price = []
scrap_img = []

for lnk in product_img:
    #print(lnk.get_attribute('src'))
    scrap_img.append(lnk.get_attribute('src'))


for lnk in product_link:
    #print(lnk.get_attribute('href'))
    scrap_link.append(lnk.get_attribute('href'))

for res in search_result:
    #print(res.text)
    scrap_list.append(res.text)

for res in product_price:
    #print(res.text)
    scrap_price.append(res.text)

finallist = zip(scrap_list,scrap_link,scrap_price,scrap_img)

l = len(scrap_list)
rows, cols = (l, 4)
b=[]
for i in range(rows):
    col = []
    val= [scrap_list[i],scrap_link[i],scrap_price[i],scrap_img[i]]
    for j in range(cols):
        col.append(val[j])
    b.append(col)

a = [u'Product Name', u'Product Link', u'Product Price' ,u'Product Image']

obj = json.dumps([dict(zip(a, row)) for row in b], indent=1)
print(obj)



