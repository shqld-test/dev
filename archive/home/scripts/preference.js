import '../styles/preference.css'

const pref = JSON.parse(sessionStorage.getItem('sp') || '{}')

customElements.define(
    'toggle-pref',
    class TogglePreference extends HTMLElement {
        constructor() {
            super()

            this.name = this.dataset.name
            this.value = this.dataset.value
            this.input = this.querySelector('input')
        }

        connectedCallback() {
            this.input.addEventListener('change', () => {
                pref[this.name] = this.value
                const json = JSON.stringify(pref)
                sessionStorage.setItem('sp', json)
                document.documentElement.setAttribute('data-sp', json)
            })

            if (pref[this.name] === this.value)
                this.input.setAttribute('checked', 'true')
        }
    }
)
