import { REPLY } from '../config/site.js'
import { getRedis, isStoreConfigured, parse } from './redis.js'

const KEY = `${REPLY.orderPrefix.toLowerCase()}:orders`

export const isOrderStoreConfigured = isStoreConfigured

export async function saveOrder(order) {
  const redis = getRedis()
  if (!redis) return false
  await redis.hset(KEY, { [order.orderNumber]: JSON.stringify(order) })
  return true
}

export async function listOrders() {
  const redis = getRedis()
  if (!redis) return []
  const all = await redis.hgetall(KEY)
  if (!all) return []
  return Object.values(all)
    .map(parse)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getOrder(orderNumber) {
  const redis = getRedis()
  if (!redis) return null
  const raw = await redis.hget(KEY, orderNumber)
  return raw ? parse(raw) : null
}

export async function markOrderSent(orderNumber, paymentDetails) {
  const order = await getOrder(orderNumber)
  if (!order) return
  order.status = 'payment-sent'
  if (paymentDetails) order.paymentDetails = paymentDetails
  await saveOrder(order)
}

export async function markPaymentConfirmed(orderNumber) {
  const order = await getOrder(orderNumber)
  if (!order) return
  order.status = 'payment-confirmed'
  order.paymentConfirmedAt = new Date().toISOString()
  await saveOrder(order)
}

export async function deleteOrder(orderNumber) {
  const redis = getRedis()
  if (!redis) return
  await redis.hdel(KEY, orderNumber)
}

export async function deleteAllOrders() {
  const redis = getRedis()
  if (!redis) return
  await redis.del(KEY)
}
