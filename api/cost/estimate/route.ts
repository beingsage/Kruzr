export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Mock cost calculation
    const items = [
      { name: 'Bitumen (Tons)', quantity: 50, rate: 45000, unit: 'ton' },
      { name: 'Concrete (Cubic m)', quantity: 100, rate: 8000, unit: 'm³' },
      { name: 'Labor (Days)', quantity: 30, rate: 2000, unit: 'day' },
      { name: 'Equipment Rental', quantity: 1, rate: 50000, unit: 'ls' },
    ]

    const materials = items.map(item => ({
      ...item,
      total: item.quantity * item.rate,
    }))

    const materialTotal = materials.reduce((sum, item) => sum + item.total, 0)
    const laborTotal = materials.find(i => i.name.includes('Labor'))?.total || 0
    const total = materialTotal + laborTotal

    return Response.json({
      estimateId: `EST-${Date.now()}`,
      items: materials,
      summary: {
        materials: materialTotal - laborTotal,
        labor: laborTotal,
        total: total,
        contingency: Math.round(total * 0.1),
        grandTotal: Math.round(total * 1.1),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
