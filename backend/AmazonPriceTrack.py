from selenium import  webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException


url = "https://www.amazon.in/Samsung-Galaxy-M12-Storage-Replacement/dp/B08XJG8MQM/ref=sr_1_1_sspa?keywords=mi%2Bphone&qid=1637417157&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExRks4MFgwREhVUVdJJmVuY3J5cHRlZElkPUEwMzY5MTY1MzA2Vk05NDdYOFJCVyZlbmNyeXB0ZWRBZElkPUEwMDA3OTI2UjU2MUdKNUVHVEVPJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&th=1"
url ="https://www.amazon.in/MANIQATEX-Cotton-Cushion-Covers-Boosters/dp/B08QFYB5B8/ref=sr_1_2?pf_rd_i=1380442031&pf_rd_m=A1K21FY43GMZF8&pf_rd_p=4bf41698-0fa5-4ec1-b63a-12ffef132582&pf_rd_r=GNSVWV7CRYMXMCNDF0JC&pf_rd_s=merchandised-search-12&pf_rd_t=101&qid=1637934919&qsid=262-8425036-2396057&refinements=p_85%3A10440599031%2Cp_36%3A42900-%2Cp_72%3A1318476031&rps=1&s=kitchen&sr=1-2&sres=B092SVGHBF%2CB08QFYB5B8%2CB08QC7XM29%2CB08QFQSBB6%2CB08HYG49VS%2CB0948ZPGNG%2CB09KBY2CM4%2CB08K86DD4K%2CB092ZMQ2SP%2CB08JTCCLLT%2CB091HDKZK6%2CB08B1662FB%2CB092ZHPYSR%2CB092ZHJWJG%2CB08WTZXL28%2CB086YH2NHC%2CB08WJGGPJH%2CB085S4WFR3%2CB089T7R5BN%2CB085S5CX4W&th=1"
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
        "image": product_img,
        "successStatus":True,
        'msg' :'PriceCheck Successfully'
    }
    print(res)
    return res

# getAmazonPrice(url)
