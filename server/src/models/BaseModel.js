import shortid from "shortid";
import { Model, snakeCaseMappers } from "objection";

class BaseModel extends Model {
  static columnNameMappers = snakeCaseMappers();
  async $beforeInsert(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.id = shortid();
  }
}

export default BaseModel;
