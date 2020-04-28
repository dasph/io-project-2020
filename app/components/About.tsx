import React, { Component } from 'react'
import { Banner } from './extra/Banner'
import { Footer } from './extra/Footer'

import './styles/about.scss'

export class About extends Component<{}, {}> {
  render () {
    return (
      <div className='about-page'>
        <div>
          <Banner title='O NAS' />
          <div>
            <div>
              <div>
                <img src='images/icon-heart.svg' />
                <div>
                  <span>Poznajmy się!</span>
                </div>
              </div>
              <div>
                <span>
                  Spotkaj ludzi, którzy zostaną Twoimi przyjaciółmi na lata!
                </span>
                <span>
                  Nasze akademiki zagwarantują Ci wszystko, czego potrzebujesz, żeby komfortowo mieszkać, studiować i spędzać czas wolny.
                </span>
                <span>
                  Już teraz wynajmij jeden z wygodnych pokoi studenckich o wysokim standardzie, który da Ci poczucie prywatności i komfortu, a jednocześnie zapewni atmosferę kampusu międzynarodowej uczelni, gdzie poznasz studentów z całego świata!
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src='images/icon-lock.svg' />
                <div>
                  <span>Gdzie nas szukać?</span>
                </div>
              </div>
              <div>
                <span>
                  Nasz akademik znajduje się w Rzeszowie na ulicy akademickiej, blisko przystanków autobusowych. Akademik ma świetne połączenia komunikacją miejską ze ścisłym centrum oraz z największymi rzeszowskimi uczelniami.
                </span>
              </div>
            </div>

            <div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.539549245037!2d21.979551215734595!3d50.01998497941821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfbb14be5e615%3A0x4b71e736b8f35f9a!2sAkademicka%201%2C%2035-084%20Rzesz%C3%B3w!5e0!3m2!1spl!2spl!4v1587740207651!5m2!1spl!2spl"></iframe>
            </div>

            <div>
              <div>
                <img src='images/icon-chat.svg' />
                <div>
                  <span>Jak się z nami skontaktować?</span>
                </div>
              </div>
              <div>
                <span>
                  Zadzwoń do nas lub napisz maila!
                </span>
                <span>
                  +48 815 346 060
                </span>
                <span>
                  kontakt@indorm.life
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
