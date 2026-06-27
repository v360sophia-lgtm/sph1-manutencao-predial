-- Criar banco de dados SPH1
CREATE DATABASE sph1_db;

\c sph1_db;

-- Tabela: Condomínios
CREATE TABLE condominiums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Blocos
CREATE TABLE blocks (
    id SERIAL PRIMARY KEY,
    condominium_id INTEGER NOT NULL REFERENCES condominiums(id),
    block_name VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(condominium_id, block_name)
);

-- Tabela: Apartamentos
CREATE TABLE apartments (
    id SERIAL PRIMARY KEY,
    block_id INTEGER NOT NULL REFERENCES blocks(id),
    floor INTEGER NOT NULL,
    apartment_number VARCHAR(10) NOT NULL,
    resident_name VARCHAR(100),
    resident_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(block_id, floor, apartment_number)
);

-- Tabela: Usuários (Técnicos e Admins)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('technician', 'admin')),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Técnicos por Obra
CREATE TABLE technician_assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    condominium_id INTEGER NOT NULL REFERENCES condominiums(id),
    assignment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(user_id, condominium_id)
);

-- Tabela: Chamados (Solicitações de Serviço)
CREATE TABLE service_calls (
    id SERIAL PRIMARY KEY,
    condominium_id INTEGER NOT NULL REFERENCES condominiums(id),
    apartment_id INTEGER NOT NULL REFERENCES apartments(id),
    technician_id INTEGER REFERENCES users(id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_at TIMESTAMP,
    completed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Fotos/Evidências dos Chamados
CREATE TABLE call_evidence (
    id SERIAL PRIMARY KEY,
    service_call_id INTEGER NOT NULL REFERENCES service_calls(id),
    image_url VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL CHECK (type IN ('before', 'after')),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Relatórios de Conclusão
CREATE TABLE completion_reports (
    id SERIAL PRIMARY KEY,
    service_call_id INTEGER NOT NULL REFERENCES service_calls(id),
    technician_id INTEGER NOT NULL REFERENCES users(id),
    observations TEXT,
    materials_used TEXT,
    signature VARCHAR(255),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_blocks_condominium ON blocks(condominium_id);
CREATE INDEX idx_apartments_block ON apartments(block_id);
CREATE INDEX idx_service_calls_condominium ON service_calls(condominium_id);
CREATE INDEX idx_service_calls_technician ON service_calls(technician_id);
CREATE INDEX idx_service_calls_status ON service_calls(status);
CREATE INDEX idx_technician_assignments_user ON technician_assignments(user_id);
CREATE INDEX idx_technician_assignments_condominium ON technician_assignments(condominium_id);

-- Inserir Condomínio: Parque dos Ipês
INSERT INTO condominiums (name, description) 
VALUES ('Parque dos Ipês', 'Condomínio residencial com 20 blocos');

-- Inserir Blocos (20 blocos)
INSERT INTO blocks (condominium_id, block_name) VALUES 
(1, '7C'), (1, '7B'), (1, '7A'),
(1, '6C'), (1, '6B'), (1, '6A'),
(1, '5C'), (1, '5B'), (1, '5A'),
(1, '4C'), (1, '4B'), (1, '4A'),
(1, '3B'), (1, '3A'),
(1, '2C'), (1, '2B'), (1, '2A'),
(1, '1C'), (1, '1B'), (1, '1A');

-- Inserir Apartamentos (5 andares x 4 apartamentos por bloco)
-- Script para popular todos os 400 apartamentos
-- (Este é um exemplo para o bloco 7C, repetir para todos os blocos)

DO $$
DECLARE
    block_id INT;
    floor INT;
    apt_num VARCHAR(10);
BEGIN
    FOR block_id IN 1..20 LOOP
        FOR floor IN 1..5 LOOP
            FOR apt_num IN 1..4 LOOP
                INSERT INTO apartments (block_id, floor, apartment_number)
                VALUES (block_id, floor, LPAD(CAST(floor AS VARCHAR), 1, '0') || LPAD(CAST(apt_num AS VARCHAR), 2, '0'));
            END LOOP;
        END LOOP;
    END LOOP;
END $$;
