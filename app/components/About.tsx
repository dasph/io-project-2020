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
                  "Quasi facilis ipsam et molestias et tempore. Ea sed tempora ut et vel ad deleniti. Modi error sapiente dolorem.
                </span>
                <span>
                  Tempore dolorem reiciendis optio nihil. Illo cupiditate et inventore aliquam aut quia natus ut. Eveniet accusamus in fugit quia non. Voluptatem ipsa rerum aut.
                  </span>
                <span>
                  Ut iste ipsam corporis sed natus. Similique aut laudantium ipsum aliquid. Alias quia accusantium et est aut ut molestias."
                </span>
                <span>
                  Ut iste ipsam corporis sed natus. Similique aut laudantium ipsum aliquid. Alias quia accusantium et est aut ut molestias."
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
                  "Quasi facilis ipsam et molestias et tempore. Ea sed tempora ut et vel ad deleniti. Modi error sapiente dolorem.
                </span>
                <span>
                  Tempore dolorem reiciendis optio nihil. Illo cupiditate et inventore aliquam aut quia natus ut. Eveniet accusamus in fugit quia non. Voluptatem ipsa rerum aut.
                  </span>
                <span>
                  Ut iste ipsam corporis sed natus. Similique aut laudantium ipsum aliquid. Alias quia accusantium et est aut ut molestias."
                </span>
                <span>
                  Ut iste ipsam corporis sed natus. Similique aut laudantium ipsum aliquid. Alias quia accusantium et est aut ut molestias."
                </span>
              </div>
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
                  "Quasi facilis ipsam et molestias et tempore. Ea sed tempora ut et vel ad deleniti. Modi error sapiente dolorem.
                </span>
                <span>
                  "Quasi facilis ipsam et molestias et tempore. Ea sed tempora ut et vel ad deleniti. Modi error sapiente dolorem.
                </span>
                <span>
                  "Quasi facilis ipsam et molestias et tempore. Ea sed tempora ut et vel ad deleniti. Modi error sapiente dolorem.
                </span>
                <span>
                  Tempore dolorem reiciendis optio nihil. Illo cupiditate et inventore aliquam aut quia natus ut. Eveniet accusamus in fugit quia non. Voluptatem ipsa rerum aut.
                  </span>
                <span>
                  Ut iste ipsam corporis sed natus. Similique aut laudantium ipsum aliquid. Alias quia accusantium et est aut ut molestias."
                </span>
                <span>
                  Ut iste ipsam corporis sed natus. Similique aut laudantium ipsum aliquid. Alias quia accusantium et est aut ut molestias."
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
