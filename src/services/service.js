import http from './http-common'

class ContactService {
    getAll() {
        return http.get("/contact")
    }

    get(id) {
        return http.get(`/contact/${id}`)
    }

    create(data) {
        return http.post("/contact", data)
    }

    update(id, data) {
        return http.put(`/contact/${id}`, data)
    }

    delete(id) {
        return http.delete(`/contact/${id}`)
    }
}

export default new ContactService()