import React, { Component } from 'react'
import { Banner } from './extra/Banner'
import { Footer } from './extra/Footer'

import './styles/pricing.scss'

export class Pricing extends Component<{}, {}> {
  render () {
    return (
      <div className='pricing-page'>
        <div>
          <Banner title='CENNIK' />
          <div>

            <div>

              <div>
                <img src='images/icon-bookmark.svg' />
                <div>
                  <span>Wysokość opłat za zakwaterowanie</span>
                </div>
              </div>

              <div>
                <span>
                  Wysokość opłat za zakwaterowanie w naszym domu studenckim
                </span>
                <span>
                  (obowiązuje od 1 października 2020 roku)
                </span>
                <span>
                  Cennik dotyczy wyłącznie pobytów nie krótszych niż jeden miesiąc.
                </span>
              </div >
            </div>

            <div>
              <div>
                <table>
                  <tr>
                    <th>Standard</th>
                    <th>Studenci i doktoranci</th>
                    <th>Pełna odpłatność</th>
                    <th>Pełna odpłatność</th>
                  </tr>
                  <tr>
                    <td>Komfort+</td>
                    <td>450 PLN</td>
                    <td>550 PLN</td>
                    <td>550 PLN</td>
                  </tr>
                  <tr>
                    <td>Komfort</td>
                    <td>400 PLN</td>
                    <td>490 PLN</td>
                    <td>550 PLN</td>
                  </tr>
                  <tr>
                    <td>Podstawowy</td>
                    <td>350 PLN</td>
                    <td>430 PLN</td>
                    <td>550 PLN</td>
                  </tr>
                </table>
              </div>
            </div>

            <div>
              <div>
                <span>
                  Cennik zawiera opłaty miesięczne. Dla okresów rozliczeniowych krótszych niż pełny miesiąc kalendarzowy, dla których należność naliczona wg stawek dobowych jest większa od opłaty miesięcznej stosuje się opłatę miesięczną. W przypadku przekwaterowań łączna należność za dany miesiąc nie przekroczy miesięcznej opłaty z akademika o najwyższym standardzie, w którym mieszkaniec był zakwaterowany.
                </span>
              </div >
            </div>

            <div>
              <div>
                <span>Rodzaje standardów w akademikach </span>
                <table>
                  <tr>
                    <th>Standard</th>
                    <th>Opis</th>
                  </tr>
                  <tr>
                    <td>Komfort+</td>
                    <td>Dwuosobowe pokoje, z indywidualną łazienką i niewielkim aneksem kuchennym</td>
                  </tr>
                  <tr>
                    <td>Komfort</td>
                    <td>Dwuosobowe pokoje, połączone w dwupokojowe studia. Wspólna łazienka i aneks kuchenny na studio.</td>
                  </tr>
                  <tr>
                    <td>Standard</td>
                    <td>Pokoje dwu- i trzyosobowe z łóżkami piętrowymi, połączone w czteropokojowe składy. Węzeł sanitarny (prysznic, dwie umywalki, toaleta) współdzielony przez cztery pokoje.</td>
                  </tr>
                </table>
              </div>
            </div>


          </div >
        </div >
        <Footer />
      </div >
    )
  }
}


{/*  */ }
