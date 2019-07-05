import React from "react"
import "../../css/footer.css"

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center" id="footer">
      Copyright &copy; Panji {new Date().getFullYear()}
    </footer>
  )
}
