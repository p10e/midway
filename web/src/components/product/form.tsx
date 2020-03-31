import React, { useEffect, useState } from 'react'
import { encode, decode } from 'shopify-gid'


import { client, useAddItemToCart, useToggleCart } from 'src/context/siteContext'

export const ProductForm = ({ defaultPrice, productId, showQuantity, addText }: {
  defaultPrice: string
  productId: number
  showQuantity?: boolean | true
  addText?: string
}) => {
  const addItemToCart = useAddItemToCart()
  const toggleCart = useToggleCart()

  const [quantity, setQuantity] = useState(1 as number)
  const [adding, setAdding] = useState(false as boolean)
  const [available, setAvailable] = useState(false)
  const [activeVariantId, setActiveVariantId] = useState(null as string | null)
  const [check, setCheck] = useState(true)

  const form = React.createRef()

  useEffect(() => {
    if (check) {
      const shopifyId = encode("Product", productId, {
        accessToken: "919118b51c64eb39f9627dd1fa0bd936",
      })

      client.product.fetch(shopifyId).then((product: any) => {
        const decodedVariants = [] as any
        product.variants.forEach((variant: any) => {
          decodedVariants.push({
            ...variant,
            cleanId: parseInt(decode(variant.id).id, 0),
          })
        })
        setActiveVariantId(decodedVariants[0].id as string)
        setAvailable(decodedVariants[0].available)

        setCheck(false)
      })
    }
  }, [check])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    if (available) {
      addItemToCart(activeVariantId, quantity).then(() => {
        setAdding(false)
        toggleCart()
      })
    }
  }

  return (
    <div className='container--m'>
      <form onSubmit={(e) => handleSubmit(e)} ref={form}>
        {available && !check ? (
          <div className='s24 product__form f jcs aist'>
            {showQuantity && (
              <div className='product__form-qty bcw cb bb f jcb aic'>
                <p className='bold s20 s-mobile'>${parseFloat(defaultPrice * quantity)}</p>
                <div className='f jcc p1 aic product__form-qty-wrapper mxa'>
                  <button type='button' className='block rel mr05 qty__control no-style s24 founders cursor p05 aic' onClick={() => quantity === 1 ? null : setQuantity(quantity - 1)}>-</button>
                  <input type='number' value={quantity} onChange={e => setQuantity(parseInt(e.currentTarget.value, 10))} name='quantity' min='1' className='cb founders card-qty bn ac' />
                  <button type='button' className='qty__control no-style s1 block  founders s24 cursor rel p05 jcc aic' onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>
            )}
            <button type='submit' className='p1 x s1 button--black button--border s20 button'><span>{adding ? 'Adding' : addText ? addText : 'Add to Cart'}</span></button>
          </div>
        ): (
          <div>
            {available ? (
              <span>Checking Stock</span>
            ): (
              <span>Unavailable</span>
            )}
          </div>
        )}
      </form>
    </div>
  )
}