#'''
#Created on 25 de Set de 2012
#
#@author: pedsilv
#'''
#
#from EventsSpider.items import EventsItem
#from cgi import log
#from scrapy.conf import settings
#from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
#from scrapy.contrib.loader import XPathItemLoader
#from scrapy.contrib.loader.processor import TakeFirst
#from scrapy.contrib.spiders import CrawlSpider, Rule
#from scrapy.http import FormRequest, Request
#from scrapy.http.cookies import CookieJar
#from scrapy.item import Item
#from scrapy.selector import HtmlXPathSelector
#from scrapy.spider import BaseSpider
#import sys
#from scrapy.utils.response import open_in_browser
#
#### Kludge to set default encoding to utf-8
##reload(sys)
##sys.setdefaultencoding('utf-8')
#
#
#class FasLoader(XPathItemLoader):
#    default_output_processor = TakeFirst()
#
#class TicketlineSpider(BaseSpider):
##    user_agent = 'foo/1.0'
#    name = "ticketline"
#    allowed_domains = ["ticketline.pt"]
#    start_urls = [
#        "http://www.ticketline.pt/Agenda.aspx"
#        #"http://www.ticketline.pt/Espectaculo.aspx",
#        #"http://www.ticketline.pt/Pesquisa.aspx?ID=3&Desc=BotoesDestaques",
#        #"http://www.ticketline.pt/Pesquisa.aspx?ID=4&Desc=BotoesDestaques"
#    ]
#
#    
#    def parse(self, response):
##        response = response.replace(body=response.body.replace("disabled",""))
#        requests = []
#        
##        req = response.request
##        print req
#        
#        #response = response.replace(body=response.body.replace("disabled",""))
#        hxs = HtmlXPathSelector(response)
#
#        
##        ids = hxs.select("//table[@class='listagem']/tr/td/a/@id").extract()
#        ds = hxs.select("//table[@class='listagem']//a/@href").re('id=[a-z0-9-]+');
#        print "test: " % ds;
##        ids = hxs.select("//table[@class='listagem']//a/@id").extract()
#        ids = hxs.select("//table[@class='listagem']//a/@id").extract()
#        #viewstate = hxs.select("//input[@id='__VIEWSTATE']/@value").extract()
#        id = "";
#        requests = []
#        
#        __EVENTTARGET = hxs.select("//input[@id='__EVENTTARGET']/@value").extract()
#        self.log('\n__EVENTTARGET: \n')
#        print __EVENTTARGET;
#        
#        __EVENTARGUMENT = hxs.select("//input[@id='__EVENTARGUMENT']/@value").extract()
#        self.log('\__EVENTARGUMENT: \n')
#        print __EVENTARGUMENT;
#        
#        __LASTFOCUS = hxs.select("//input[@id='__LASTFOCUS']/@value").extract()
#        self.log('\__LASTFOCUS: \n')
#        print __LASTFOCUS;
#        
#        __VIEWSTATE = hxs.select("//input[@id='__VIEWSTATE']/@value").extract()
#        self.log('\__VIEWSTATE: .....\n')
##        print __VIEWSTATE;
#
#        __PREVIOUSPAGE = hxs.select("//input[@id='__PREVIOUSPAGE']/@value").extract()
#        self.log('\__PREVIOUSPAGE: \n')
##        print __PREVIOUSPAGE;
#        
#        __EVENTVALIDATION = hxs.select("//input[@id='__EVENTVALIDATION']/@value").extract()
#        self.log('\__EVENTVALIDATION: \n')
##        print __EVENTVALIDATION;
#
#        
##        self.log('\nGoing to next search page: '  + '\n')
##        cookieJar = response.meta.setdefault('ASP.NET_SessionId', CookieJar())
##        cookieJar.extract_cookies(response, response.request)
#        
##        for id in ids:
#        if ids.__len__() != 0 :
#            for i in range(1, 3):
#                id = ids[i];
#                id = id.replace('_','$')
#                managerState = 'ctl00$ContentPlaceHolder1$UpdAgenda|%s' % id
#                print id ;
#                print id , managerState;
#                print response.url;
#    
#    #            yield Request("http://www.ticketline.pt" ,dont_filter=True,  callback=self.parse_item)
#    
#    #request2 = request.copy() # doesn't copy the callback
#    #request3 = request.replace(callback=request.callback)                                
#                newUrlResponse = ''
#                newUrlResponse = response.url + "?dummy=%s" % i 
#    #            print 'response ********************' + response.url.__str__()
#                response = response.replace(url=newUrlResponse)
#    #            print 'after response ********************' + response.url.__str__()
#                
##                print '_____________________form params: __EVENTTARGET' + id.__str__() + ' __EVENTARGUMENT: ' + __EVENTARGUMENT.__str__() + ' __LASTFOCUS: ' + __LASTFOCUS.__str__() + ' __PREVIOUSPAGE: ' + __PREVIOUSPAGE.__str__() + '__EVENTVALIDATION: ' + __EVENTVALIDATION.__str__() + ' __VIEWSTATE: ' + __VIEWSTATE.__str__()
#                print '_____________________form params: __EVENTTARGET' + id.__str__() + ' managerState: ' + managerState.__str__()
#                yield Request("http://www.ticketline.pt/Agenda.aspx?x=%s" % id , callback=self.parse_itemX, meta={'id': id, '__VIEWSTATE' : __VIEWSTATE})
#                 
#                
##                requests.append(FormRequest(newUrlResponse,
##                        method='POST',                          
##                        formdata={
##                                              '__EVENTTARGET':id,
##                                              '__EVENTARGUMENT':__EVENTARGUMENT, 
##                                              '__LASTFOCUS':__LASTFOCUS, 
##                                              '__VIEWSTATE': __VIEWSTATE,
##                                              '__PREVIOUSPAGE': __PREVIOUSPAGE,
##                                              '__EVENTVALIDATION':__EVENTVALIDATION,
##                                              'ctl00$ScriptManager1': managerState,
##    #                                          '__ASYNCPOST': 'true',
##                                              },
##                        callback=self.parse_item,
##                        meta={'id': id}  ) 
##                                )
#             
#                        
##                requests.append(FormRequest.from_response(
##                                    response,
##                                    formdata={
##                                              '__EVENTTARGET':id,
##                                              '__EVENTARGUMENT':__EVENTARGUMENT, 
##                                              '__LASTFOCUS':__LASTFOCUS, 
##                                              '__VIEWSTATE': __VIEWSTATE,
##                                              '__PREVIOUSPAGE': __PREVIOUSPAGE,
##                                              '__EVENTVALIDATION':__EVENTVALIDATION,
##                                              'ctl00$ScriptManager1': managerState,
##    #                                          '__ASYNCPOST': 'true',
##                                              },
##                                    callback=self.parse_item,
##                                    dont_click=True,
##                                    dont_filter=True,
##    #                                clickdata={'__ASYNCPOST': 'true'},  
##                                    meta={'id': id}   )
##                                )
#    #            newUrlResponse = response.url + "?%s" % i 
#    #            request = response.replace(url=newUrlResponse)
#    #            print '********************' + request.url.__str__()
#    #            newUrl = request.url + "?%s" % i
#    #            request = request.replace(url=newUrl)
#    #            print 'after ********************' + request.url.__str__()
#        
##            requests.append( request );               
#    
#        
#        
##        print 'Start requests--' 
#        
##        print requests
###        yield
##        for request in requests:
##            print '_____________________original request: ' + request.__str__() + ' url: ' + request.url + ' headers: ' + request.headers.__str__() + ' meta: ' + request.meta.__str__() 
##            yield request
###            continue
###        for i in range(requests.__len__()):
###            yield requests[i]
###            print i
##        yield Request("http://www.ticketline.pt/Agenda.aspx", callback=self.parse_itemX, meta={'id': 'ctl00$ContentPlaceHolder1$ListaEspec21$DT11'})
##        yield FormRequest.from_response(
##                                    response,
##                                    formdata={
##                                              '__EVENTTARGET':'ctl00$ContentPlaceHolder1$ListaEspec21$DT11',
##                                              '__EVENTARGUMENT':__EVENTARGUMENT, 
###                                              '__LASTFOCUS':__LASTFOCUS, 
###                                              '__VIEWSTATE': __VIEWSTATE,
###                                              '__PREVIOUSPAGE': __PREVIOUSPAGE,
###                                              '__EVENTVALIDATION':__EVENTVALIDATION,
###                                              'ctl00$ScriptManager1': managerState,
##    #                                          '__ASYNCPOST': 'true',
##                                              },
##                                    callback=self.parse_item,
##                                    dont_click=True,
##                                    dont_filter=True,
##    #                                clickdata={'__ASYNCPOST': 'true'},  
##                                    meta={'id': 'ctl00$ContentPlaceHolder1$ListaEspec21$DT11'}   )
##        yield FormRequest.from_response(
##                                    response,
##                                    formdata={
##                                              '__EVENTTARGET':'ctl00$ContentPlaceHolder1$ListaEspec21$DT132',
##                                              '__EVENTARGUMENT':__EVENTARGUMENT, 
###                                              '__LASTFOCUS':__LASTFOCUS, 
###                                              '__VIEWSTATE': __VIEWSTATE,
###                                              '__PREVIOUSPAGE': __PREVIOUSPAGE,
###                                              '__EVENTVALIDATION':__EVENTVALIDATION,
###                                              'ctl00$ScriptManager1': managerState,
##    #                                          '__ASYNCPOST': 'true',
##                                              },
##                                    callback=self.parse_item,
##                                    dont_click=True,
##                                    dont_filter=True,
##    #                                clickdata={'__ASYNCPOST': 'true'},  
##                                    meta={'id': 'ctl00$ContentPlaceHolder1$ListaEspec21$DT132'}   )
#        
#        
#    def parse_itemX(self, response):
#        
##        print settings['LOG_ENABLED']
##        print response.url , response.body
#
#        hxs = HtmlXPathSelector(response)
#        
#        __EVENTTARGET = hxs.select("//input[@id='__EVENTTARGET']/@value").extract()
#        __EVENTARGUMENT = hxs.select("//input[@id='__EVENTARGUMENT']/@value").extract()
#        __LASTFOCUS = hxs.select("//input[@id='__LASTFOCUS']/@value").extract()
##        __VIEWSTATE = hxs.select("//input[@id='__VIEWSTATE']/@value").extract()
#        __PREVIOUSPAGE = hxs.select("//input[@id='__PREVIOUSPAGE']/@value").extract()
#        __EVENTVALIDATION = hxs.select("//input[@id='__EVENTVALIDATION']/@value").extract()
#        ctl00_MsgNewsletter = hxs.select("//input[@id='ctl00$MsgNewsletter']/@value").extract()
#
#        
#        id = response.request.meta['id']
#        __VIEWSTATE = response.request.meta['__VIEWSTATE']
#        managerState = 'ctl00$ContentPlaceHolder1$UpdAgenda|%s' % id
#
#        print "?????????????????????????????????????????????????????????????????????? " + id
#        print "?????????????????????????????????????????????????????????????????????? " + managerState  
#        print "?????????????????????????????????????????????????????????????????????? " + __VIEWSTATE.__str__()
#        
#        yield FormRequest.from_response(
#                                    response,
#                                    formdata={
#                                              '__EVENTTARGET':id,
#                                              '__EVENTARGUMENT': __EVENTARGUMENT, 
#                                              '__LASTFOCUS':__LASTFOCUS, 
#                                              '__VIEWSTATE': __VIEWSTATE,
#                                              '__PREVIOUSPAGE': __PREVIOUSPAGE,
#                                              '__EVENTVALIDATION':__EVENTVALIDATION,
#                                              'ctl00$ScriptManager1': managerState,
#                                              'ctl00$MsgNewsletter': ctl00_MsgNewsletter,
#                                              '__ASYNCPOST': True,
#                                              },
#                                    callback=self.parse_item,
#                                    dont_click=True,
#                                    dont_filter=True,
#    #                                clickdata={'__ASYNCPOST': 'true'},  
#                                    meta={'id': id}   )
#  
#    def parse_item(self, response):
#        
##        print settings['LOG_ENABLED']
##        print response.url , response.body
#        
#        id = response.request.meta['id']
#        
#        hx = HtmlXPathSelector(response)
#
#        self.log('\n\n##################################### Processing response: %s: ##################################### \n' % id )
#        self.log('\n\n************ response: **************** ' )
#        print 'response: ' + response.__str__() + ' url: ' + response.url + ' headers: ' + response.headers.__str__() + ' meta: ' + response.meta.__str__()        
#        
#
#        
##        print hx.select("//html/text()").extract()
##        print hx.select("//span[class='bigTitle']/text()").extract()
##        print hx.select("//td[@class='nomeEspec']/text()").extract()
##        print hx.select("//td[@class='descInfo']/text()").extract()
#        
#        self.log('\n\n************ response_request: **************** ' )
#        print 'response_request: ' + response.request.__str__() + ' url: ' + response.request.url + ' headers: ' + response.request.headers.__str__() + ' meta: ' + response.request.meta.__str__()
#        
#        self.log("\n\n************** End Processing response ***************** \n\n")
#        
#        item = EventsItem()
#        item['artists'] = hx.select("//td[@class='nomeEspec']/text()").extract()
#        item['location'] = hx.select("//td[@class='descInfo']/text()").extract()
#        item['date'] = id
#        
#        open_in_browser(response);
##        item['cost'] = response.body
#        
#        yield item
##        l = FasLoader(item, hx)
##        return l.load_item()
#        
##        return Request('http://www.ticketline.pt/Agenda.aspx')
#
##        yield item 
#        
#        #return cenas
##        pass
#                
#       
#SPIDER = TicketlineSpider()                
#                
