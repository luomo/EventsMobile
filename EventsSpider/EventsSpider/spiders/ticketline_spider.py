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

            #headers =  {'Referer' : 'http://www.ticketline.pt/Agenda.aspx'}
             
            request = FormRequest.from_response(
                                response,
                                formdata={
                                          '__EVENTTARGET':'ctl00$ContentPlaceHolder1$ListaEspec21$DT10',
                                          '__EVENTARGUMENT':'', 
                                          '__LASTFOCUS':__LASTFOCUS, 
                                          '__VIEWSTATE': __VIEWSTATE,
                                          '__PREVIOUSPAGE': __PREVIOUSPAGE,
                                          'ctl00$ScriptManager1':'ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$ListaEspec21$DT10',
                                          #'__ASYNCPOST': True,
                                          #'ctl00$ContentPlaceHolder1$ListaEspec21$IT10.x':52,
                                          #'ctl00$ContentPlaceHolder1$ListaEspec21$IT10.y':44
                                          },
#                                formdata={id:'', 'ctl00$ScriptManager1':'ctl00$ContentPlaceHolder1$UpdAgenda|ctl00$ContentPlaceHolder1$ListaEspec21$IT10', 
#                                          '__ASYNCPOST':'true', 'ctl00$ContentPlaceHolder1$ListaEspec21$IT13.x':'48', 'ctl00$ContentPlaceHolder1$ListaEspec21$IT13.y': '75', 
#                                          '__VIEWSTATE':'/wEPDwUKMTk5NDkyOTE5NQ9kFgJmD2QWBAIBD2QWBAIBDxYCHgRocmVmBWkvV2ViUmVzb3VyY2UuYXhkP2Q9OE9JYVYxWV9wUHZQal9kWHI0Ti1odWplengtWGoxc2t0TVdlYVhnNTJNbmZRNG5wb21DYnFfQndIUHJrOWFZejAmdD02MzQ3OTYwOTcxNTQ5MjY5MzVkAgIPFgIfAAVpL1dlYlJlc291cmNlLmF4ZD9kPXM2UEY3UF8yUFZLckhMOFk2c093VG9QR3dsOXBmeHVLMjVNV0cyeFIycV9ZcjRHNGVNV1dEZzlCWFRhQkhib3EwJnQ9NjM0Njk5MjA1NDU4OTE3NjI4ZAIFD2QWDAIODw8WAh4LRGlzcGxheU5hbWVlZGQCDw8PFgoeCENzc0NsYXNzBQZjTG9naW4eCUxvZ2luVGV4dAUIPiBFbnRyYXIeCkxvZ291dFRleHQFBj4gU2Fpch4HVG9vbFRpcGUeBF8hU0ICAmRkAhEPDxYCHg9DbGllbnRSZWZlcmVuY2UCFGRkAhIPDxYCHwcCFGRkAhMPDxYCHwcCFGRkAhQPZBYCAgEPZBYCZg9kFgQCAQ8PFgYfBwIUHgpEYXRhQWN0aXZhBgBAcPjahc8IHgxEYXRhU2VsZWN0ZWQGAEBw+NqFzwhkZAIDDw8WCh4KUGF0aEltYWdlcwUtaHR0cDovL3d3dy50aWNrZXRsaW5lLnB0L2ltYWdlcy9Fc3BlY3RhY3Vsb3MvHwcCFB4VU2VxdWVuY2lhRXNwZWN0YWN1bG9zBakENTQ0MjszNjczOzU0NjM7NTE3MDs1MjQ0OzUyMzY7NTE1Njs1MjU1OzUxMjI7NTI4Mzs1NjU2OzUyNDU7NTMwOTs1NTc1OzMxNjI7NTA1NDs1MzEyOzUyNTY7NTI4MDs1NjU0OzM0MjI7NTIzMTs1NTYyOzUyMTA7NDk2OTs1NDE3OzUwNjI7NTI2NTs1MjExOzQ5MDE7NTE5Njs1NTA3OzU0NDU7NTMzMzs2NzA7NTA5Nzs1MjMyOzQwNTE7NTMwMjs1NjQxOzUxMzA7NTU2MTs1MDY1OzU0NDA7NTQ1MTs1NDQ2OzU2NzI7NTU4Mzs0ODYyOzUyOTc7NTE5Nzs1MzgwOzE1NDg7NTMxMzs1MzA0OzQ5MzQ7NTI5MDs1Mzc2OzU0MzE7NTQwODs1NTc2OzU2NjU7NDYzMTs1Mjg4OzUxNjI7NTIwMzs1MzA1OzU0Njc7NTQzMDs1NjUyOzU0NTI7NTY3MTs1MzExOzQ3MDg7NTQxNjs1MjU0OzUyNTM7NTQ1Mzs1NTAxOzUzMTk7NTI1Nzs1Mjc2OzU1MzI7MzY3ODs0ODg2OzU2Njg7NTEyODs1Mjg0OzUyMjE7NTIwOTs0ODk2OzU0MzI7NTIzMzs0NjUwOzQ2MDk7NTM4Mjs1MzA2OzU0NjI7NTI2Mjs1Mjk4OzU0MzQ7NTY1ODs1Njg2OzU0Mjg7NDE0Nzs1NjYxOzUyNjA7NTMzOTs1NTcyOzQ1MTA7NTQzMx4HRGF0YUZpbQYAAGvGpJzPCB4KRGF0YUluaWNpbwYAQHD42oXPCGRkGAMFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxZ7BQtjdGwwMCRMb2dvMQUYY3RsMDAkTG9naW5TdGF0dXMxJGN0bDAxBRhjdGwwMCRMb2dpblN0YXR1czEkY3RsMDMFG2N0bDAwJExua0V2ZW50b3MxJExOS19FVlRfMQUbY3RsMDAkTG5rRXZlbnRvczEkRmVzdGl2YWlzBRhjdGwwMCRMbmtFdmVudG9zMSRDaW5lbWEFHWN0bDAwJExua0V2ZW50b3MxJEJhYnlzaXR0aW5nBSNjdGwwMCRMbmtFdmVudG9zMSRQYXJxdWVzX1RlbWF0aWNvcwUeY3RsMDAkTG5rRXZlbnRvczEkRXhwZXJpZW5jaWFzBSFjdGwwMCRMbmtFdmVudG9zMSRPdXRyb3NfUHJvZHV0b3MFHWN0bDAwJExua0V2ZW50b3MxJE1lcmNoYW5kaXNlBRpjdGwwMCRMbmtFdmVudG9zMSRNYWdhemluZQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMAUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMgUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMwUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNAUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNgUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNwUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOAUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTAFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTExBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTMFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTE0BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExNQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTYFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTE3BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExOAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTkFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTIwBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEyMQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMjIFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTIzBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEyNAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMjUFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTI2BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEyNwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMjgFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTI5BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzMAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMzEFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTMyBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzMwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMzQFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTM1BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzNgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMzcFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTM4BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzOQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDAFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTQxBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE0MgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDMFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTQ0BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE0NQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDYFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTQ3BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE0OAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDkFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTUwBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE1MQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNTIFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTUzBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE1NAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNTUFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTU2BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE1NwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNTgFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTU5BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2MAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNjEFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTYyBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2MwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNjQFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTY1BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2NgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNjcFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTY4BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2OQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzAFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTcxBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE3MgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzMFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTc0BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE3NQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzYFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTc3BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE3OAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzkFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTgwBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE4MQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxODIFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTgzBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE4NAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxODUFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTg2BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE4NwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxODgFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTg5BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5MAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOTEFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTkyBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5MwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOTQFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTk1BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5NgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOTcFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTk4BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5OQUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTAwBS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMDEFLWN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTEwMgUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTAzBS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMDQFLWN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTEwNQUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTA2BS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMDcFLWN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTEwOAUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTA5BS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMTAFFmN0bDAwJFRvcDEkVGFiQ29udGVudHMPD2RmZAUdY3RsMDAkTG5rRXZlbnRvczEkVGFiQ29udGVudHMPD2RmZF2JkEyNfLeweeSagU91IvMv5dYi__PREVIOUSPAGE:mUbClgsFTtpLkw4eyqSKoQ2__EVENTVALIDATION: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'},
#                                 formdata={'id':'' , 
#                                           '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$ListaEspec21$DT10' ,
#                                           '__EVENTARGUMENT':''},
                                callback=self.parse_item,
                                dont_click=True, 
#                                meta = {'dont_merge_cookies': True, 'cookie_jar': cookieJar}, 
                                headers = {'Referer' : 'http://www.ticketline.pt/Agenda.aspx'},
#            request = FormRequest.from_response(
#                                response,
#                                formdata={id:'', 
#                                          '__EVENTTARGET':id,
#                                          '__EVENTARGUMENT':__EVENTARGUMENT, 
#                                          '__LASTFOCUS':__LASTFOCUS, 
#                                          '__VIEWSTATE': __VIEWSTATE,
#                                          '__PREVIOUSPAGE': __PREVIOUSPAGE,
#                                          '__EVENTVALIDATION': __EVENTVALIDATION
#                                          },
##                                formdata={id:'', 'ctl00$ScriptManager1':'ctl00$ContentPlaceHolder1$UpdAgenda|ctl00$ContentPlaceHolder1$ListaEspec21$IT10', 
##                                          '__ASYNCPOST':'true', 'ctl00$ContentPlaceHolder1$ListaEspec21$IT13.x':'48', 'ctl00$ContentPlaceHolder1$ListaEspec21$IT13.y': '75', 
##                                          '__VIEWSTATE':'/wEPDwUKMTk5NDkyOTE5NQ9kFgJmD2QWBAIBD2QWBAIBDxYCHgRocmVmBWkvV2ViUmVzb3VyY2UuYXhkP2Q9OE9JYVYxWV9wUHZQal9kWHI0Ti1odWplengtWGoxc2t0TVdlYVhnNTJNbmZRNG5wb21DYnFfQndIUHJrOWFZejAmdD02MzQ3OTYwOTcxNTQ5MjY5MzVkAgIPFgIfAAVpL1dlYlJlc291cmNlLmF4ZD9kPXM2UEY3UF8yUFZLckhMOFk2c093VG9QR3dsOXBmeHVLMjVNV0cyeFIycV9ZcjRHNGVNV1dEZzlCWFRhQkhib3EwJnQ9NjM0Njk5MjA1NDU4OTE3NjI4ZAIFD2QWDAIODw8WAh4LRGlzcGxheU5hbWVlZGQCDw8PFgoeCENzc0NsYXNzBQZjTG9naW4eCUxvZ2luVGV4dAUIPiBFbnRyYXIeCkxvZ291dFRleHQFBj4gU2Fpch4HVG9vbFRpcGUeBF8hU0ICAmRkAhEPDxYCHg9DbGllbnRSZWZlcmVuY2UCFGRkAhIPDxYCHwcCFGRkAhMPDxYCHwcCFGRkAhQPZBYCAgEPZBYCZg9kFgQCAQ8PFgYfBwIUHgpEYXRhQWN0aXZhBgBAcPjahc8IHgxEYXRhU2VsZWN0ZWQGAEBw+NqFzwhkZAIDDw8WCh4KUGF0aEltYWdlcwUtaHR0cDovL3d3dy50aWNrZXRsaW5lLnB0L2ltYWdlcy9Fc3BlY3RhY3Vsb3MvHwcCFB4VU2VxdWVuY2lhRXNwZWN0YWN1bG9zBakENTQ0MjszNjczOzU0NjM7NTE3MDs1MjQ0OzUyMzY7NTE1Njs1MjU1OzUxMjI7NTI4Mzs1NjU2OzUyNDU7NTMwOTs1NTc1OzMxNjI7NTA1NDs1MzEyOzUyNTY7NTI4MDs1NjU0OzM0MjI7NTIzMTs1NTYyOzUyMTA7NDk2OTs1NDE3OzUwNjI7NTI2NTs1MjExOzQ5MDE7NTE5Njs1NTA3OzU0NDU7NTMzMzs2NzA7NTA5Nzs1MjMyOzQwNTE7NTMwMjs1NjQxOzUxMzA7NTU2MTs1MDY1OzU0NDA7NTQ1MTs1NDQ2OzU2NzI7NTU4Mzs0ODYyOzUyOTc7NTE5Nzs1MzgwOzE1NDg7NTMxMzs1MzA0OzQ5MzQ7NTI5MDs1Mzc2OzU0MzE7NTQwODs1NTc2OzU2NjU7NDYzMTs1Mjg4OzUxNjI7NTIwMzs1MzA1OzU0Njc7NTQzMDs1NjUyOzU0NTI7NTY3MTs1MzExOzQ3MDg7NTQxNjs1MjU0OzUyNTM7NTQ1Mzs1NTAxOzUzMTk7NTI1Nzs1Mjc2OzU1MzI7MzY3ODs0ODg2OzU2Njg7NTEyODs1Mjg0OzUyMjE7NTIwOTs0ODk2OzU0MzI7NTIzMzs0NjUwOzQ2MDk7NTM4Mjs1MzA2OzU0NjI7NTI2Mjs1Mjk4OzU0MzQ7NTY1ODs1Njg2OzU0Mjg7NDE0Nzs1NjYxOzUyNjA7NTMzOTs1NTcyOzQ1MTA7NTQzMx4HRGF0YUZpbQYAAGvGpJzPCB4KRGF0YUluaWNpbwYAQHD42oXPCGRkGAMFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxZ7BQtjdGwwMCRMb2dvMQUYY3RsMDAkTG9naW5TdGF0dXMxJGN0bDAxBRhjdGwwMCRMb2dpblN0YXR1czEkY3RsMDMFG2N0bDAwJExua0V2ZW50b3MxJExOS19FVlRfMQUbY3RsMDAkTG5rRXZlbnRvczEkRmVzdGl2YWlzBRhjdGwwMCRMbmtFdmVudG9zMSRDaW5lbWEFHWN0bDAwJExua0V2ZW50b3MxJEJhYnlzaXR0aW5nBSNjdGwwMCRMbmtFdmVudG9zMSRQYXJxdWVzX1RlbWF0aWNvcwUeY3RsMDAkTG5rRXZlbnRvczEkRXhwZXJpZW5jaWFzBSFjdGwwMCRMbmtFdmVudG9zMSRPdXRyb3NfUHJvZHV0b3MFHWN0bDAwJExua0V2ZW50b3MxJE1lcmNoYW5kaXNlBRpjdGwwMCRMbmtFdmVudG9zMSRNYWdhemluZQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMAUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMgUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMwUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNAUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNgUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNwUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOAUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTAFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTExBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTMFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTE0BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExNQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTYFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTE3BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExOAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTkFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTIwBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEyMQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMjIFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTIzBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEyNAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMjUFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTI2BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEyNwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMjgFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTI5BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzMAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMzEFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTMyBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzMwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMzQFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTM1BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzNgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMzcFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTM4BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDEzOQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDAFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTQxBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE0MgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDMFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTQ0BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE0NQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDYFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTQ3BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE0OAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNDkFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTUwBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE1MQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNTIFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTUzBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE1NAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNTUFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTU2BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE1NwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNTgFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTU5BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2MAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNjEFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTYyBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2MwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNjQFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTY1BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2NgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNjcFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTY4BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE2OQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzAFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTcxBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE3MgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzMFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTc0BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE3NQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzYFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTc3BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE3OAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxNzkFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTgwBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE4MQUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxODIFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTgzBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE4NAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxODUFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTg2BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE4NwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxODgFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTg5BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5MAUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOTEFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTkyBSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5MwUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOTQFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTk1BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5NgUsY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxOTcFLGN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTk4BSxjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDE5OQUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTAwBS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMDEFLWN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTEwMgUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTAzBS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMDQFLWN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTEwNQUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTA2BS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMDcFLWN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkTGlzdGFFc3BlYzIxJElUMTEwOAUtY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRMaXN0YUVzcGVjMjEkSVQxMTA5BS1jdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJExpc3RhRXNwZWMyMSRJVDExMTAFFmN0bDAwJFRvcDEkVGFiQ29udGVudHMPD2RmZAUdY3RsMDAkTG5rRXZlbnRvczEkVGFiQ29udGVudHMPD2RmZF2JkEyNfLeweeSagU91IvMv5dYi__PREVIOUSPAGE:mUbClgsFTtpLkw4eyqSKoQ2__EVENTVALIDATION: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'},
##                                 formdata={'id':'' , 
##                                           '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$ListaEspec21$DT10' ,
##                                           '__EVENTARGUMENT':''},
#                                callback=self.parse_item, 
##                                meta = {'dont_merge_cookies': True, 'cookie_jar': cookieJar}, 
#                                headers = {'Referer' : 'http://www.ticketline.pt/Agenda.aspx'},
                )
#            cookieJar.add_cookie_header(request) # apply Set-Cookie ourselves
        
    
    
            requests.append( request);               
    
        
        print 'Aqui--' 
        
        for request in requests:
            yield request
    
        #print ids;
#            requests.append(Request("http://www.ticketline.pt/Espectaculo.aspx?%s" % id, callback=self.parse_item))
            
        
            
            #requests.append(FormRequest.from_response(
            #        response,
            #        formdata={'__EVENTTARGET':id,
            #                  '__VIEWSTATE':viewstate},
            #        callback=self.parse_esp,
            #        dont_click = True,
            #    )
            #)        
        
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
                
class PTYeaaaahSpider(CrawlSpider):
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