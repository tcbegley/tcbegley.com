import Content from './content'
import Navbar from './navbar'
import Footer from './footer'

import { content, pageContainer } from './layout.module.css'

export default function Layout({
  children,
  column,
  title,
  author,
  date,
  path,
  tags,
}) {
  const flexColumnStyle = {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }

  return (
    <div className={pageContainer}>
      <Navbar />
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

Layout.defaultProps = {
  column: true,
}
