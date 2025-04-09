"use client"

import React, { useEffect, useState } from "react"

import { Devotional, devotionalColumns, devotionalConfig } from "@/types/devotional"
import CrudProvider from "@/components/crud/CrudProvider"
import { Card, CardContent } from "@/components/ui/card"

const DevotionalManagement: React.FC = () => {
    const collectionName = "devotionals"
    const title = "Data Renungan Harian"
    const description = "Atur renungan harian yang tampil pada halaman utama website"

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <p className="text-muted-foreground mb-8">
                {description}
            </p>

            <Card>
                <CardContent className="pt-6">
                    <CrudProvider<Devotional>
                        config={{
                            collection: collectionName,
                            defaultSort: { field: "createdAt", direction: "desc" },
                            defaultPageSize: 20,
                        }}
                        fields={devotionalConfig}
                        columns={devotionalColumns}
                        entityName="Renungan"
                    />
                </CardContent>
            </Card>

            <div className="mt-8 bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Note:</h3>
                <p className="text-sm text-muted-foreground">
                    Before using this application, make sure to update your Firebase configuration in{" "}
                    <code>src/lib/firebase.ts</code> with your own Firebase project credentials.
                </p>
            </div>
        </div>
    )
}

export default DevotionalManagement
