import React from 'react'
import PropTypes from 'prop-types'

import Content from './content'
import Header from './header'
import Footer from './footer'

import { content, pageContainer } from './layout.module.css'

const Layout = ({ children, column, title, author, date, path, tags }) => {
  const flexColumnStyle = {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }

  return (
    <div className={pageContainer}>
      <Header />
      <div className={content} style={column ? flexColumnStyle : null}>
        <Content
          title={title}
          author={author}
          date={date}
          path={path}
          tags={tags}
        >
          {children}
        </Content>
      </div>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  column: PropTypes.bool,
}

Layout.defaultProps = {
  column: true,
}

export default Layout
