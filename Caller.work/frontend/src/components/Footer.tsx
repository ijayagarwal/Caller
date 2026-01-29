import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1a1f3a] text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl mb-4">About</h3>
            <p className="text-white/70 leading-relaxed">
              Caller is a voice-first AI companion and advisor platform. We&apos;re in beta 
              development and can&apos;t wait to share what we&apos;re building.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl mb-4">Contact</h3>
            <a 
              href="mailto:contact@caller.work"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2 mb-4"
            >
              <Mail className="w-4 h-4" />
              contact@caller.work
            </a>
            <p className="text-white/70 text-sm">
              Questions? Ideas? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl mb-4">Legal</h3>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
            <p className="text-white/60 text-sm mt-4">
              Your email is never shared. No spam, ever.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/60 text-sm">
              © 2025 Caller. Launching soon.
            </div>

            <div className="flex gap-6">
              <a
                href="https://x.com/ijayagarwal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter/X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/jayagarwalg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="mailto:contact@caller.work"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
