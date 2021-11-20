from selenium import  webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException

url = "https://www.flipkart.com/montrez-full-sleeve-solid-women-denim-jacket/p/itm8174d7fe0aaf8?pid=JCKFG89C7WUT4VWY&lid=LSTJCKFG89C7WUT4VWYXKCAJJ&marketplace=FLIPKART&store=clo%2Fqvw&srno=b_1_6&otracker=hp_omu_Today%2527s%2BFashion%2BDeals_1_7.dealCard.OMU_0TG5CC1AAK7V_7&otracker1=hp_omu_PINNED_neo%2Fmerchandising_Today%2527s%2BFashion%2BDeals_NA_dealCard_cc_1_NA_view-all_7&fm=neo%2Fmerchandising&iid=d4ab64df-4a7f-4800-b63e-1ce65b55774f.JCKFG89C7WUT4VWY.SEARCH&ppt=browse&ppn=browse"

priceList = []
option = webdriver.ChromeOptions()
option.add_argument('headless')
driver = webdriver.Chrome(ChromeDriverManager().install(),options=option)

def getFlipkartPrice(url):
    driver.get(url)
    search_result = driver.find_element(By.XPATH, "//span[contains(@class,'B_NuCI')]")
    product_price = driver.find_element(By.XPATH, "//div[contains(@class,'_30jeq3 _16Jk6d')]")
    #print(search_result.text)
    try:
        p_img = driver.find_element(By.XPATH, "//img[contains(@class,'_396cs4 _2amPTt _3qGmMb  _3exPp9')]")
    except NoSuchElementException:
        p_img = driver.find_element(By.XPATH, "//img[contains(@class,'_2r_T1I _396QI4')]")

    product_img = p_img.get_attribute('src')
    price = product_price.text.replace(u'\u20B9', '')
    price = price.replace(',','')
    price = (int(price))
    #print(price)
    res = {
    "Name": search_result.text,
    "Price": price,
    "Image": product_img
    }
    #print(res)
    return res

