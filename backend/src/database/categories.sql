-- Tabela de Categorias de Serviço
CREATE TABLE service_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(50) NOT NULL,
    color VARCHAR(7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adicionar coluna category_id na tabela service_calls
ALTER TABLE service_calls ADD COLUMN category_id INTEGER REFERENCES service_categories(id);

-- Inserir categorias de serviço
INSERT INTO service_categories (name, description, icon_name, color) VALUES
('Elétrica', 'Problemas elétricos e instalações', 'zap', '#FFD700'),
('Hidráulica', 'Encanamento e vazamentos', 'droplet', '#1E90FF'),
('Pintura', 'Pintura de paredes e acabamento', 'paintbrush', '#FF6347'),
('Alvenaria', 'Reparo em alvenaria e tijolos', 'hammer', '#8B4513'),
('Cerâmicas', 'Cerâmicas ocas ou desplacamento', 'square', '#D3D3D3'),
('Laminados', 'Rodapés e laminados', 'layers', '#CD853F'),
('Gás', 'Problemas com gás', 'flame', '#FF4500'),
('Interfone', 'Reparo de interfone', 'phone', '#4169E1'),
('Limpeza Geral', 'Limpeza e higienização', 'sparkles', '#32CD32'),
('Janelas', 'Vidro arranhado ou acabamento', 'window', '#87CEEB'),
('Porta', 'Porta arranhada ou estufada', 'door', '#8B4513'),
('Fechadura', 'Fechadura travada ou não funciona', 'lock', '#696969'),
('Infiltração', 'Problemas de infiltração de água', 'cloud-rain', '#4682B4'),
('Brises', 'Brises de janelas danificados', 'blinds', '#A9A9A9'),
('Outros', 'Outros tipos de serviço', 'more-horizontal', '#808080');
