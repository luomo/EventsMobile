'''
Created on 25 de Set de 2012

@author: pedsilv
'''

from EventsSpider.items import EventsItem
from cgi import log
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.http import FormRequest, Request
from scrapy.http.cookies import CookieJar
from scrapy.selector import HtmlXPathSelector
from scrapy.spider import BaseSpider


class TicketlineSpider(BaseSpider):
    name = "ticketline"
    allowed_domains = ["ticketline.pt"]
    start_urls = [
        "http://www.ticketline.pt/Agenda.aspx"
        #"http://www.ticketline.pt/Espectaculo.aspx",
        #"http://www.ticketline.pt/Pesquisa.aspx?ID=3&Desc=BotoesDestaques",
        #"http://www.ticketline.pt/Pesquisa.aspx?ID=4&Desc=BotoesDestaques"
    ]
    
    def parse(self, response):
#        response = response.replace(body=response.body.replace("disabled",""))
        requests = []
        
#        req = response.request
#        print req
        
        #response = response.replace(body=response.body.replace("disabled",""))
        hxs = HtmlXPathSelector(response)
        
#        ids = hxs.select("//table[@class='listagem']/tr/td/a/@id").extract()
        ds = hxs.select("//table[@class='listagem']//a/@href").re('id=[a-z0-9-]+');
        print "test: " % ds;
#        ids = hxs.select("//table[@class='listagem']//a/@id").extract()
        ids = hxs.select("//table[@class='listagem']//a[contains(@href, 'DT10')]/@id").extract()
        #viewstate = hxs.select("//input[@id='__VIEWSTATE']/@value").extract()
        id = "";
        requests = []
        
        __EVENTTARGET = hxs.select("//input[@id='__EVENTTARGET']/@value").extract()
        self.log('\n__EVENTTARGET: \n')
        print __EVENTTARGET;
        
        __EVENTARGUMENT = hxs.select("//input[@id='__EVENTARGUMENT']/@value").extract()
        self.log('\__EVENTARGUMENT: \n')
        print __EVENTARGUMENT;
        
        __LASTFOCUS = hxs.select("//input[@id='__LASTFOCUS']/@value").extract()
        self.log('\__LASTFOCUS: \n')
        print __LASTFOCUS;
        
        __VIEWSTATE = hxs.select("//input[@id='__VIEWSTATE']/@value").extract()
        self.log('\__VIEWSTATE: .....\n')
#        print __VIEWSTATE;

        __PREVIOUSPAGE = hxs.select("//input[@id='__PREVIOUSPAGE']/@value").extract()
        self.log('\__PREVIOUSPAGE: \n')
        print __PREVIOUSPAGE;
        
        __EVENTVALIDATION = hxs.select("//input[@id='__EVENTVALIDATION']/@value").extract()
        self.log('\__EVENTVALIDATION: \n')
        print __EVENTVALIDATION;

        
#        self.log('\nGoing to next search page: '  + '\n')
#        cookieJar = response.meta.setdefault('ASP.NET_SessionId', CookieJar())
#        cookieJar.extract_cookies(response, response.request)
        
#        for i in range(1, 5):
        for id in ids:
#            id = ids[1];
            id = id.replace('_','$')
            print id;
            print response.url;

             
            request = FormRequest.from_response(
                                response,
                                formdata={
                                          '__EVENTTARGET':id,
                                          '__EVENTARGUMENT':__EVENTARGUMENT, 
                                          '__LASTFOCUS':__LASTFOCUS, 
                                          '__VIEWSTATE': __VIEWSTATE,
                                          '__PREVIOUSPAGE': __PREVIOUSPAGE,
                                          'ctl00$ScriptManager1':'ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$ListaEspec21$DT10',
                                          },
                                callback=self.parse_item,
                                dont_click=True,  
                                headers = {'Referer' : 'http://www.ticketline.pt/Agenda.aspx'},
                )
        
    
    
            requests.append( request);               
    
        
        print 'Aqui--' 
        
        for request in requests:
            yield request
        
        
    def parse_item(self, response):
        
#        print response.url , response.body
        
        hx = HtmlXPathSelector(response)

        print "AQUI-"
        print hx
        
        print "AQUI--"
        
#        print hx.select("//html/text()").extract()
#        print hx.select("//span[class='bigTitle']/text()").extract()
        print hx.select("//td[@class='nomeEspec']/text()").extract()
        
        print "AQUI---"
        
        #return cenas
                
       
SPIDER = TicketlineSpider()                
                
