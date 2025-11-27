import { useEffect, useState } from 'react'
import Card from '../components/Card'
import '../styles/activities.scss'

const API_BASE_URL = 'http://localhost:4000'

function Activities({ isAuthenticated }) {
  const [activities, setActivities] = useState([])
  const [diasSemana, setDiasSemana] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [activitiesResponse, diasResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/activities`),
          fetch(`${API_BASE_URL}/diasSemana`),
        ])

        if (!activitiesResponse.ok || !diasResponse.ok) {
          throw new Error('Respuesta no válida del servidor mock')
        }

        const [activitiesData, diasData] = await Promise.all([
          activitiesResponse.json(),
          diasResponse.json(),
        ])

        setActivities(activitiesData)
        setDiasSemana(diasData)
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar las actividades. Intenta nuevamente en unos segundos.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <section className="activities">
      <header className="activities__header">
        <p className="eyebrow">Actividades</p>
        <h1>Agenda tu próxima clase</h1>
        <p className="activities__subtitle">
          Consulta los horarios y, si inicias sesión, podrás inscribirte directamente.
        </p>
      </header>

      <div className="activities__grid">
        {isLoading && <p className="activities__notice">Cargando actividades...</p>}
        {error && <p className="activities__notice">{error}</p>}

        {!isLoading && !error && activities.length === 0 && (
          <p className="activities__notice">No hay actividades disponibles por ahora.</p>
        )}

        {!isLoading &&
          !error &&
          activities.map((activity) => (
            <Card
              key={activity.id ?? activity.nombre}
              title={activity.nombre}
              subtitle={activity.descripcion}
              className="activity-card"
            >
              <div className="activity-card__schedule">
                {activity.horarios.map((slot, index) => (
                  <div key={`${activity.nombre}-${index}`} className="schedule-chip">
                    <span className="schedule-chip__day">
                      {diasSemana[slot.dia] ?? 'Día no disponible'}
                    </span>
                    <span className="schedule-chip__time">
                      {slot['hora-inicio']} - {slot['hora-fin']}
                    </span>
                  </div>
                ))}
              </div>

              {isAuthenticated ? (
                <button type="button" className="button button--primary button--block">
                  Inscribirme
                </button>
              ) : (
                <p className="activities__notice">Inicia sesión para inscribirte.</p>
              )}
            </Card>
          ))}
      </div>
    </section>
  )
}

export default Activities
