import { footer } from './footer.module.css'

export default function Footer() {
  return (
    <footer>
      <span className={footer}>
        © Tom Begley 2026 | Built with{' '}
        <a href="https://www.nextjs.org">Next.js</a>
      </span>
    </footer>
  )
}
