from selenium import  webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException


url = "https://www.amazon.in/Samsung-Galaxy-M12-Storage-Replacement/dp/B08XJG8MQM/ref=sr_1_1_sspa?keywords=mi%2Bphone&qid=1637417157&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExRks4MFgwREhVUVdJJmVuY3J5cHRlZElkPUEwMzY5MTY1MzA2Vk05NDdYOFJCVyZlbmNyeXB0ZWRBZElkPUEwMDA3OTI2UjU2MUdKNUVHVEVPJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1"
priceList = []
option = webdriver.ChromeOptions()
option.add_argument('headless')
driver = webdriver.Chrome(ChromeDriverManager().install(),options=option)

def getAmazonPrice(url):
    driver.get(url)
    search_result = driver.find_element(By.XPATH, "//span[contains(@id,'productTitle')]")
    try:
        product_price = driver.find_element(By.XPATH, "//span[contains(@id,'priceblock_dealprice')]")
    except NoSuchElementException:
        product_price = driver.find_element(By.XPATH, "//span[contains(@id,'priceblock_ourprice')]")

    p_img = driver.find_element(By.XPATH, "//img[contains(@class,'a-dynamic-image ')]")



    product_img = p_img.get_attribute('src')

    #print(product_img)
    #print(search_result.text)
    price = product_price.text.replace(u'\u20B9', '')
    price = price.replace(',','')
    price = (float(price))
    #print(price)
    res = {
        "name" : search_result.text,
        "price": price,
        "image": product_img
    }
    #print(res)
    return res

#getAmazonPrice(url)
