'''
Created on 25 de Set de 2012

@author: pedsilv
'''

from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
#from scrapy.spider import BaseSpider
from scrapy.selector import HtmlXPathSelector
#from scrapy.http.request import Request


class EventsSpider(CrawlSpider):
    name = "ptyeaaah"
    allowed_domains = ["pt.yeaaaah.com"]
    start_urls = [
        "http://pt.yeaaaah.com/pt/agenda-de-concertos",
        ##"http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/"
    ]

    rules = (
             Rule (SgmlLinkExtractor(allow=(r'concert/\d+/*', ))
                   , callback='parse_item', follow= True),
             )
    
    def parse_item(self, response):
        hxs = HtmlXPathSelector(response)
        
        # hxs.select("/html/body/div/div[@id='content']/div[@class='concerts_listing']")
        #sites = hxs.select("/html/body/div/div[@id='content']/div[@class='concerts_listing']/table/tr/td[@class='artists']")
        
        
        ## /html/body/div/div[2]/div[2]/h3/text()
        
        #for site in sites:
        #    links = site.select('a/@href').extract()
            
        #    for link in links:
        #        if not not link:
        #            yield Request('http://pt.yeaaaah.com' + link, self.parse)
                
        artists = hxs.select("//div[@class='main_artists']/a/text()").extract()
        date = hxs.select("//time/@datetime").extract()
        location = hxs.select("//span[@itemprop='location']/text()").extract()
        cost = hxs.select("//dd[3]/text()").extract()
                
        print 'Artista: ' + artists.__str__() 
        print 'Data: ' + date.__str__()
        print 'Localizacao: ' + location.__str__() 
        print 'Carcanhol: ' + cost.__str__()
                
                
                
            
            #events = site.select('table')
            
            #for event in events:
            #    artist = event.select('tr/td[3]/text()').extract()
            
            #    print artist
            
            
            #link = site.select('a/@href').extract()
            #desc = site.select('text()').extract()
            
        
        #filename = response.url.split("/")[-2]
        #open(filename, 'wb').write(response.body)