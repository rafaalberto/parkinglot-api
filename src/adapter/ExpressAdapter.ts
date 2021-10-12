export default class ExpressAdapter {
  static create (fn: any) {
    return async function (req: any, res: any) {
      const obj = await fn(req.params, req.body)
      res.json(obj)
    }
  }
}
