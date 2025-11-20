export default class GenericRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAll = async () => {
        return await this.dao.get({});
    }

    getBy = async (params) => {
        return await this.dao.getBy(params);
    }

    save = async (doc) => {
        return await this.dao.save(doc);
    }


    create = async (doc) => {
        return await this.dao.save(doc);
    }

    update = async (id, doc) => {
        return await this.dao.update(id, doc);
    }

    delete = async (id) => {
        return await this.dao.delete(id);
    }
}