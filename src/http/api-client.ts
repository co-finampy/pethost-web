import ky from "ky"

export const api = ky.create({
  prefixUrl: 'https://pet-api-l79d.onrender.com'
})