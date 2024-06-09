"use client";

import dynamic from "next/dynamic"

import { useMemo } from 'react'

export function MyLeafletMap() {
  const LeafletMap = useMemo(
    () => dynamic(() => import("./map"), { ssr: false }),
    []
  );

  return <LeafletMap />
}