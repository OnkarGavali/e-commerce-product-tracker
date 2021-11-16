from automate.automate import automate


with automate() as bot:
    bot.land_first_page()
    bot.land_second_page()