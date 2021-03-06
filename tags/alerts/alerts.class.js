class RgAlerts extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this.alerts = []
    if (!rg.isArray(opts.alerts)) return
    opts.alerts.forEach((alert) => {
      this.add(alert)
    })
  }

  add(alert) {
    alert.id = rg.uid()
    if (rg.isUndefined(alert.isvisible)) alert.isvisible = true
    if (alert.timeout) {
      alert.startTimer = () => {
        alert.timer = setTimeout(() => {
          this.dismiss(alert)
          this.update()
        }, rg.toNumber(alert.timeout))
      }
      alert.startTimer()
    }
    this.alerts.push(alert)
  }

  dismiss(alert) {
    alert.isvisible = false
    if (rg.isFunction(alert.onclose)) alert.onclose(alert)
    clearTimeout(alert.timer)
  }

  select(alert) {
    if (rg.isFunction(alert.onclick)) alert.onclick(alert)
  }
}
