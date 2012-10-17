'''
Created on 16 de Out de 2012

@author: jcunh
'''

from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.selector import HtmlXPathSelector
from EventsSpider.items import EventsItem

#from scrapy.spider import BaseSpider
#from scrapy.http.request import Request



class MyOutSpider(CrawlSpider):
    name = "myout"
    allowed_domains = ["myout.net"];
    start_urls = [
        "http://myout.net/events/concert/Portugal"
    ]
    
    rules = (
             Rule (SgmlLinkExtractor(allow=(r'events/[a-zA-Z0-9.-]+/\d+/*', ), deny=('events/\w+/view/*')) #[a-zA-Z_/]+
                   , callback='parse_item', 
                   follow= True),
             )
    
    
    def parse_item(self, response):
        
        hxs = HtmlXPathSelector(response);

        item = EventsItem();
        
        item['artists'] = hxs.select('//a[@class="title"]/text()').extract();
        item['location'] = hxs.select('//div[@class="itemInfo"]/p[@class="pPlace"]//a/text()').extract();
        item['address'] = hxs.select('//div[@class="map-details"]/p/text()').extract();
        item['date'] = hxs.select('//div[@class="itemInfo"]/p[@class="pDate"]/span[2]/text()').extract();
        #item['link'] = hxs.select('//div[@class="itemInfo"]/p[@class="pDate"]/span[2]/text()').extract();
        item['cost'] = hxs.select('//div[@class="itemInfo"]/p[@class="pCost"]/span[2]/text()').extract();
        return item;
    
#SPIDER = MyOutSpider()


