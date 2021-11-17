# pip install selenium & web_driver_manager before executing
#finallist returns search results

from selenium import  webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
import json

def getFlipkartSearch(sv):
    search_value = sv
    option = webdriver.ChromeOptions()
    option.add_argument('headless')
    driver = webdriver.Chrome(ChromeDriverManager().install(),options=option)

    driver.get("https://www.flipkart.com/search?q=" + search_value)
    #driver.implicitly_wait(10)
    #driver.find_element(By.XPATH,"//input[contains(@id,'search')]").send_keys(search_value)
    #driver.find_element(By.XPATH,"//input[@value='Go']").click()
    #driver.find_element(By.XPATH,"//span[text()='MI']").click()
    flg=0


    try:
        flg = 3
        test1 = driver.find_element(By.XPATH, "//div[contains(@class,'_2WkVRV')]")
    except NoSuchElementException:
        flg = 2
        try:
            test = driver.find_element(By.XPATH, "//a[contains(@class,'s1Q9rs')]")
        except NoSuchElementException:
            flg = 1

    if (flg==3):
            search_result = driver.find_elements(By.XPATH, "//div[contains(@class,'_2WkVRV')]")
            product_price = driver.find_elements(By.XPATH, "//div[contains(@class,'_30jeq3')]")
            product_link = driver.find_elements(By.XPATH, "//a[contains(@class,'_2UzuFa')]")
            product_img = driver.find_elements(By.XPATH, "//img[contains(@class,'_2r_T1I')]")

    if(flg == 2):
        search_result = driver.find_elements(By.XPATH,"//a[contains(@class,'s1Q9rs')]")
        product_price = driver.find_elements(By.XPATH,"//div[contains(@class,'_30jeq3')]")
        product_link = driver.find_elements(By.XPATH,"//a[contains(@class,'s1Q9rs')]")
        product_img = driver.find_elements(By.XPATH, "//img[contains(@class,'_396cs4 _3exPp9')]")



    print(flg)

    if(flg==1):
        search_result = driver.find_elements(By.XPATH, "//div[contains(@class,'_4rR01T')]")
        product_price = driver.find_elements(By.XPATH, "//div[contains(@class,'_30jeq3 _1_WHN1')]")
        product_link = driver.find_elements(By.XPATH, "//a[contains(@class,'_1fQZEK')]")
        product_img = driver.find_elements(By.XPATH, "//img[contains(@class,'_396cs4 _3exPp9')]")










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
        x = res.text
        x = x.replace(u'\u20B9' , '')
        scrap_price.append(x)

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
    return obj



