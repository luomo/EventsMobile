'''
Created on 25 de Set de 2012

@author: pedsilv
'''

from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
#from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
from EventsSpider.items import EventsItem
#from scrapy.http.request import Request


class EventsSpider(CrawlSpider):
    name = "ptyeaaah"
    allowed_domains = ["pt.yeaaaah.com"]
    start_urls = [
        "http://pt.yeaaaah.com/pt/agenda-de-concertos",
    ]

    rules = (
             Rule (SgmlLinkExtractor(allow=(r'concert/\d+/*', ))
                   , callback='parse_item', follow= True),
             )
    
    def parse_item(self, response):
        hxs = HtmlXPathSelector(response)
                
        item = EventsItem()
                  
                        
        item['artists'] = hxs.select("//div[@class='main_artists']/a/text()|//div[@class='support_artists']/a/text()").extract() #+ hxs.select("//div[@class='support_artists']/a/text()").extract()
        
        item['date'] = hxs.select("//time/@datetime").extract()

        item['location'] = hxs.select("//span[@itemprop='location']/text()").extract()
        
        item['address'] = hxs.select("//img[@src='/img/icons/car.png']/following::dd[1]/text()").extract() # morada
        
        item['link'] = hxs.select("//img[@src='/img/icons/link.png']/following::dd[1]/a/@href").extract() # link
        
        item['cost'] = hxs.select("//img[@src='/img/icons/money.png']/following::dd[1]/text()").extract() # cost
        
        return item
                