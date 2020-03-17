import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'

import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from '../components/seo'
import Layout from '../components/layout'

import style from '../styles/index.module.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const Index = ({ data }) => (
  <>
    <SEO />
    <Layout>
      <div className={style.indexContainer}>
        <div className={style.indexRow}>
          <div className={style.textCol}>
            <h1 className={style.heading}>Hello, I'm Tom.</h1>
            <p className={style.summary}>
              I am a data scientist and mathematician. I'm currently R&D Lead at{' '}
              <a href="https://faculty.ai">Faculty</a>
            </p>
          </div>
          <div className={style.imgCol}>
            <Img
              fixed={data.file.childImageSharp.fixed}
              alt="tom"
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
        <p className={style.text}>
          You've found my website. It has some information about me, and things
          I've worked on both professionally and in my spare time. I've also
          aspirationally set up a blog that I occasionally get around to writing
          things for. I'm interested in many things including, but not limited
          to Bayesian inference, machine learning, web development, and
          programming with Python.
        </p>
        <span className={style.social}>
          <a href="https://github.com/tcbegley">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://linkedin.com/in/tcbegley">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://twitter.com/tcbegley">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </span>
      </div>
    </Layout>
  </>
)

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "me.jpg" }) {
      childImageSharp {
        id
        fixed(width: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

Index.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Index
