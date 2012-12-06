'''
Created on 25 de Set de 2012

@author: pedsilv
'''

from EventsSpider.items import EventsItem
from cgi import log
from scrapy.conf import settings
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.contrib.loader import XPathItemLoader
from scrapy.contrib.loader.processor import TakeFirst
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.http import FormRequest, Request
from scrapy.http.cookies import CookieJar
from scrapy.item import Item
from scrapy.selector import HtmlXPathSelector
from scrapy.spider import BaseSpider
from scrapy.utils.response import open_in_browser
import sys

### Kludge to set default encoding to utf-8
#reload(sys)
#sys.setdefaultencoding('utf-8')


class FasLoader(XPathItemLoader):
    default_output_processor = TakeFirst()

class TicketlineSpider(BaseSpider):
#    user_agent = 'foo/1.0'
    name = "ticketline"
    allowed_domains = ["ticketline.pt"]
    start_urls = [
        "http://www.ticketline.pt/Agenda.aspx"
    ]

    
    def parse(self, response):

        hxs = HtmlXPathSelector(response)
        id =  hxs.select("//table[@class='lnkEvents']/tr/td[@class='tabUnselR']/a/@id").extract()[0].replace('_','$')
        print id;
        
        __EVENTTARGET = hxs.select("//input[@id='__EVENTTARGET']/@value").extract()        
        __EVENTARGUMENT = hxs.select("//input[@id='__EVENTARGUMENT']/@value").extract()
        __LASTFOCUS = hxs.select("//input[@id='__LASTFOCUS']/@value").extract()
        __VIEWSTATE = hxs.select("//input[@id='__VIEWSTATE']/@value").extract()
        __PREVIOUSPAGE = hxs.select("//input[@id='__PREVIOUSPAGE']/@value").extract()
        __EVENTVALIDATION = hxs.select("//input[@id='__EVENTVALIDATION']/@value").extract()

        yield FormRequest.from_response( response,
                                         formdata={ 
                                              '__EVENTTARGET': id,
                                              '__EVENTARGUMENT':__EVENTARGUMENT, 
                                              '__LASTFOCUS':__LASTFOCUS, 
                                              '__VIEWSTATE': __VIEWSTATE,
                                              '__PREVIOUSPAGE': __PREVIOUSPAGE,
                                              '__EVENTVALIDATION':__EVENTVALIDATION
                                              },
                                    callback=self.parse_event_list,
                                    dont_click=True,
#                                    dont_filter=True,  
                                     )
    
    
    def parse_event_list(self, response):
        hxs = HtmlXPathSelector(response)
        requests = []
        ids = hxs.select("//table[@class='pesquisa']//select[@name='ctl00$LnkEventos1$cPesquisa$ctl02']//option/@value").extract()
        for id in ids: 
            requests.append(Request("http://www.ticketline.pt/Espectaculo.aspx?IdEspectaculo=%s" % id, callback=self.parse_event))
        
        for request in requests: 
            yield request;


    def parse_event(self, response):
        hxs = HtmlXPathSelector(response)

        item = EventsItem()
        item['artists'] = hxs.select("//td[@class='nomeEspec']/text()").extract()
        item['location'] = hxs.select("//td[@class='descInfo']/text()").extract()
        item['date'] = id
                
        yield item
        
        
        
        
                
                
