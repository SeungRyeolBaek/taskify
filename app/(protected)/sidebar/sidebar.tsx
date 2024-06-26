'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import CreateDashboard from '../dashboard/_components/create-dashboard'
import SidebarCta from './sidebar-cta'
import { fetchDashboards } from '../dashboard/_api-wrapper/fetch-dashboards'

interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId: number
}

const SideBar: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [loading, setLoading] = useState(false)
  const { boardid } = useParams()

  useEffect(() => {
    const loadDashboards = async () => {
      setLoading(true)
      try {
        const data = await fetchDashboards('infiniteScroll')
        setDashboards(data.dashboards)
      } catch (error) {
        console.error('Failed to fetch dashboards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboards()
  }, [])

  return (
    <div className='relative w-[80px] h-screen overflow-x-hidden overflow-y-auto scrollbar-hide border-r md:w-[160px] md:px-[14px] xl:w-[300px] xl:px-[12px]'>
      <Image
        src={'/logo2.png'}
        alt={'logo'}
        width={108}
        height={33}
        className='absolute left-6 top-5 mx-3'
      />
      <div className='mt-[110px] w-[80px] md:w-[160px] xl:w-[300px]'>
        <CreateDashboard mode={'sidebar'} />
        {dashboards.map((dashboard) => (
          <SidebarCta
            key={dashboard.id}
            id={dashboard.id}
            title={dashboard.title}
            color={dashboard.color}
            isOwner={dashboard.createdByMe}
            isSelected={boardid === String(dashboard.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default SideBar
