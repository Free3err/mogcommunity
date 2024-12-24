from app.core.database import get_db

class ProjectRepository:
    def get_all(self):
        db = get_db()
        projects = db.execute('SELECT * FROM projects').fetchall()
        return [dict(project) for project in projects]
    
    def create(self, name, description):
        db = get_db()
        cursor = db.execute(
            'INSERT INTO projects (name, description) VALUES (?, ?)',
            (name, description)
        )
        db.commit()
        
        return self.get_by_id(cursor.lastrowid)
    
    def get_by_id(self, project_id):
        db = get_db()
        project = db.execute(
            'SELECT * FROM projects WHERE id = ?', 
            (project_id,)
        ).fetchone()
        return dict(project) if project else None 