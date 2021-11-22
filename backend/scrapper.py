import requests
from bs4 import BeautifulSoup
import smtplib
import time

URL = 'https://www.amazon.in/Dervin-Avengers-Sunglasses-Spectacle-Silver-Blue/dp/B08C6BBJNP/ref=sr_1_43?crid=2AB66N7C63SKF&dchild=1&keywords=sunglasses+for+men+stylish&qid=1633966690&qsid=257-2938877-0430166&sprefix=sung%2Caps%2C328&sr=8-43&sres=B089FNHYND%2CB071CP6K43%2CB07FM7TJPY%2CB078RN2FG2%2CB017IYSTVW%2CB07FM7TPPY%2CB0752VR169%2CB01CZTXKQE%2CB071CY7ZGM%2CB07FM48D14%2CB07S1VLFP4%2CB07FM48D16%2CB07FMFD3RY%2CB084BZ9F3Z%2CB07XLF16Q1%2CB07XJ4D5X7%2CB07J5FGTMV%2CB09GHYPVND%2CB079Z4FJD7%2CB098B2FZJD&srpt=SUNGLASSES'

headers = {"User-Agent":'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4662.6 Safari/537.36'}


def checkPrice(url):
    page = requests.get(url,headers=headers)

    soup = BeautifulSoup(page.content,'html.parser')

    title = soup.find(id="productTitle").get_text()
    price = soup.find(id="priceblock_dealprice").get_text()
    Images = soup.findAll('img')
    converted_price = float(price[1:7])

    if(converted_price<400):
        send_mail(url)

    print(converted_price)
    print(title.strip())
    for image in Images:
        if image.get('id') == 'landingImage':
            ImageURL = image.get('src')
            print(ImageURL)
    

    thisdict = {
        "title": title,
        "price": price,
        "imageURL": ImageURL
    }
    return thisdict

def send_mail(url,email,price):
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.ehlo()
    server.starttls()
    server.ehlo()

    server.login('malushreyash@gmail.com','znmjsgqardhdszjn')
    subject = "Price Fell Down!"
    body = 'Check the amazon Link ' + url
    msg = f"Subject:{subject}\n\n{body}"
    server.sendmail(
        'malushreyash@gmail.com',
        email,
        msg
    )
    print("Hey Email has been sent")
    server.quit()


# print(a.__class__.title)
    # time.sleep(60*60*24)