"use client"

import { useState, useEffect } from "react"

export function useSearch(items = [], searchFields = []) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items)
      return
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase()

    const filtered = items.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field]
        if (typeof fieldValue === "string" || typeof fieldValue === "number") {
          return String(fieldValue).toLowerCase().includes(lowerCaseSearchTerm)
        }
        return false
      })
    })

    setFilteredItems(filtered)
  }, [searchTerm, items, searchFields])

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  }
}
