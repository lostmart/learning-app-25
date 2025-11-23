const BASE_URL = "/lessons" // Will look in public/lessons/

// Generic fetch wrapper with error handling
export async function fetchData<T>(endpoint: string): Promise<T> {
	const url = `${BASE_URL}${endpoint}`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(
				`Failed to fetch data: ${response.status} ${response.statusText}`
			)
		}

		const data = await response.json()
		return data as T
	} catch (error) {
		// Log for debugging
		console.error("API Error:", error)

		// Re-throw so components can handle it
		throw error
	}
}

// Optional: Add more utilities as needed
export async function fetchWithTimeout<T>(
	endpoint: string,
	timeoutMs: number = 5000
): Promise<T> {
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			signal: controller.signal,
		})

		clearTimeout(timeoutId)

		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		clearTimeout(timeoutId)
		throw error
	}
}
