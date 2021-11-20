from selenium import  webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import NoSuchElementException
#JSON File Format
list = [{"email" : "aditya@gmail.com",
         "url": ["https://www.flipkart.com/anchor-panasonic-spike-guard-4-universal-shutter-socket-single-switch-1-5-meters-cord-extension-boards/p/itm6219402ee00f8?pid=SURFGWGFFFD2JFPG&lid=LSTSURFGWGFFFD2JFPGKKGXU4&marketplace=FLIPKART&store=b8s%2Fprq%2Fgxf&srno=b_1_1&otracker=hp_omu_Deals%2Bof%2Bthe%2BDay_1_3.dealCard.OMU_ODTGG3LGAEHL_3&otracker1=hp_omu_SECTIONED_manualRanking_neo%2Fmerchandising_Deals%2Bof%2Bthe%2BDay_NA_dealCard_cc_1_NA_view-all_3&fm=neo%2Fmerchandising&iid=4fcce948-e251-4e3b-89b0-4bafe1826d53.SURFGWGFFFD2JFPG.SEARCH&ppt=hp&ppn=homepage&ssid=02lsd0r4n40000001636914169017","https://www.flipkart.com/anchor-panasonic-spike-guard-4-universal-shutter-socket-single-switch-1-5-meters-cord-extension-boards/p/itm6219402ee00f8?pid=SURFGWGFFFD2JFPG&lid=LSTSURFGWGFFFD2JFPGKKGXU4&marketplace=FLIPKART&store=b8s%2Fprq%2Fgxf&srno=b_1_1&otracker=hp_omu_Deals%2Bof%2Bthe%2BDay_1_3.dealCard.OMU_ODTGG3LGAEHL_3&otracker1=hp_omu_SECTIONED_manualRanking_neo%2Fmerchandising_Deals%2Bof%2Bthe%2BDay_NA_dealCard_cc_1_NA_view-all_3&fm=neo%2Fmerchandising&iid=4fcce948-e251-4e3b-89b0-4bafe1826d53.SURFGWGFFFD2JFPG.SEARCH&ppt=hp&ppn=homepage&ssid=02lsd0r4n40000001636914169017"]}]

url = "https://www.flipkart.com/anchor-panasonic-spike-guard-4-universal-shutter-socket-single-switch-1-5-meters-cord-extension-boards/p/itm6219402ee00f8?pid=SURFGWGFFFD2JFPG&lid=LSTSURFGWGFFFD2JFPGKKGXU4&marketplace=FLIPKART&store=b8s%2Fprq%2Fgxf&srno=b_1_1&otracker=hp_omu_Deals%2Bof%2Bthe%2BDay_1_3.dealCard.OMU_ODTGG3LGAEHL_3&otracker1=hp_omu_SECTIONED_manualRanking_neo%2Fmerchandising_Deals%2Bof%2Bthe%2BDay_NA_dealCard_cc_1_NA_view-all_3&fm=neo%2Fmerchandising&iid=4fcce948-e251-4e3b-89b0-4bafe1826d53.SURFGWGFFFD2JFPG.SEARCH&ppt=hp&ppn=homepage&ssid=02lsd0r4n40000001636914169017"

priceList = []
option = webdriver.ChromeOptions()
option.add_argument('headless')
driver = webdriver.Chrome(ChromeDriverManager().install(),options=option)

def getFlipkartPrice(url):
    driver.get(url)
    search_result = driver.find_element(By.XPATH, "//span[contains(@class,'B_NuCI')]")
    product_price = driver.find_element(By.XPATH, "//div[contains(@class,'_30jeq3 _16Jk6d')]")
    print(search_result.text)
    price = product_price.text.replace(u'\u20B9', '')
    price = price.replace(',','')
    price = (int(price))
    print(price)
    priceList.append(price)
    print(priceList)

getFlipkartPrice(url)