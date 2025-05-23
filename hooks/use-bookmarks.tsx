"use client"

import { createContext, useContext, useState, useEffect } from "react"

const BookmarksContext = createContext({
  bookmarks: [],
  addBookmark: (employee) => {},
  removeBookmark: (id) => {},
  isBookmarked: (id) => false,
})

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("hr-dashboard-bookmarks")
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks))
      } catch (error) {
        console.error("Error parsing bookmarks from localStorage:", error)
      }
    }
  }, [])

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("hr-dashboard-bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (employee) => {
    if (!isBookmarked(employee.id)) {
      setBookmarks((prev) => [...prev, employee])
    }
  }

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
  }

  const isBookmarked = (id) => {
    return bookmarks.some((bookmark) => bookmark.id === id)
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export function useBookmarks() {
  return useContext(BookmarksContext)
}
